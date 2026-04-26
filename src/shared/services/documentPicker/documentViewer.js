import { viewDocument, isErrorWithCode, errorCodes } from '@react-native-documents/viewer'

async function handleOpenDocument(item) {
    try {
        await viewDocument({
            uri: item.uri, // required
            mimeType: item.type, // 🔥 IMPORTANT (helps Android choose app)

            // Optional configs
            grantPermissions: 'read', // Android (recommended)
            headerTitle: item.name,   // iOS title
        })
    } catch (error) {
        if (isErrorWithCode(error)) {
            if (error.code === errorCodes.UNABLE_TO_OPEN_FILE_TYPE) {
                console.log('No app found to open this file type')
            }
        }
        console.log('Error opening document', error)
    }
}

export default handleOpenDocument