/**
 * PDF Service
 * -----------------------------------------
 * This service handles downloading PDF files
 * from an online URL in two different ways:
 *
 * 1) Download PDF to temporary cache directory
 *    → Used when you want to SHARE the PDF
 *    → No storage permission required
 *
 * 2) Download PDF to device storage (Downloads)
 *    → Used when user explicitly wants to SAVE
 *    → Requires storage permission on Android
 *
 * HOW TO USE:
 * -----------------------------------------
 * import PdfService from './pdfService'
 *
 * await downloadToLocal()
 * await downloadToDownloads()
 */

import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import RNFS from 'react-native-fs'
import { showDownloadNotification, updateDownloadCompleteNotification } from '../notifee/notifee'

/**
 * Requests storage permission (Android only)
 * Required when saving file to Downloads folder
 */
const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true

    const stats = await Platform.constants
    const apiLevel = stats.Release ? parseInt(stats.Release) : 0

    // For Android 13 (API 33) and above, WRITE_EXTERNAL_STORAGE is deprecated
    // and usually doesn't need to be explicitly requested for Downloads
    if (apiLevel >= 13) return true

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to download PDF files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
                'Permission Required',
                'To save PDFs, storage permission is needed. Please enable it in Settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Settings', onPress: () => Linking.openSettings() },
                ]
            )
            return false
        }
        return false
    } catch (err) {
        console.warn(err)
        return false
    }
}

/**
 * Download PDF to cache directory
 * -----------------------------------------
 * USE CASE:
 * - Share PDF via WhatsApp / Gmail / Drive
 * - Temporary file
 * - No permission required
 *
 * RETURNS:
 * - Local file path of downloaded PDF
 */
const downloadToLocal = async ({ fileUrl, fileName } = {}) => {
    if (!fileUrl || !fileName) {
        console.error('Invalid fileUrl or fileName')
        return null
    }

    const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`

    await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: localPath,
    }).promise

    return localPath
}

/**
 * Generates a unique file path by appending (1), (2), etc. if file exists
 */
const getUniqueFilePath = async (basePath) => {
    let filePath = basePath
    let counter = 1

    const extensionIndex = basePath.lastIndexOf('.')
    if (extensionIndex === -1) {
        while (await RNFS.exists(filePath)) {
            filePath = `${basePath} (${counter})`
            counter++
        }
    } else {
        const base = basePath.substring(0, extensionIndex)
        const extension = basePath.substring(extensionIndex)
        while (await RNFS.exists(filePath)) {
            filePath = `${base} (${counter})${extension}`
            counter++
        }
    }
    return filePath
}

/**
 * Download PDF to device Downloads folder
 * -----------------------------------------
 * USE CASE:
 * - User wants to SAVE PDF on device
 * - Visible in File Manager / Downloads
 *
 * RETURNS:
 * - true if download success
 */
const downloadToDownloads = async ({ fileUrl, fileName } = {}) => {
    console.log('Downloading file to Downloads folder...', fileUrl, fileName)
    const hasPermission = await requestStoragePermission()
    if (!hasPermission) return false

    showDownloadNotification({ id: fileName, title: `Downloading ${fileName}`, body: 'Please wait...' })
    const baseFilePath = `${RNFS.DownloadDirectoryPath}/${fileName}`
    const filePath = await getUniqueFilePath(baseFilePath)

    try {
        const result = await RNFS.downloadFile({
            fromUrl: fileUrl,
            toFile: filePath,
        }).promise

        if (result.statusCode === 200) {
            if (Platform.OS === 'android') {
                await RNFS.scanFile(filePath)
            }
            console.log('Download Complete', filePath)
            updateDownloadCompleteNotification({ id: fileName, title: 'Download Complete', body: `${fileName} downloaded to Downloads folder`, filePath })
            return filePath
        } else {
            // showToast(`Download failed with status: ${result.statusCode}`)
            return null
        }
    } catch (error) {
        console.error('Download Error:', error)
        // showToast('An unexpected error occurred during download.')
        return null
    }
}

/**
 * Single export (public API of service)
 */
export {
    downloadToLocal,
    downloadToDownloads,
    requestStoragePermission
}

