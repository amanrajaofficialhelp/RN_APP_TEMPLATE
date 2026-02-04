/**
 * File Sharing Service
 * --------------------
 * This service provides helper methods to share local files
 * (PDF, images, text, etc.) using the native share sheet or
 * directly to a specific app like WhatsApp.
 *
 * IMPORTANT:
 * - WhatsApp ONLY accepts local files (file:// or content://)
 * - Online URLs (https://) will NOT work for file sharing
 * - No storage permission is required if file is in cache
 */

import Share from 'react-native-share';

/**
 * Default MIME type fallback
 * Used when file type is unknown
 */
const DEFAULT_MIME = 'application/octet-stream';

/**
 * Supported file-type → MIME mapping
 * Extend this map if you add more file formats
 */
const mimeMap = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    txt: 'text/plain',
    json: 'application/json',
};

/**
 * Normalize file URI
 * Ensures the path is compatible with Android / iOS share intents
 */
function normalizeUri(filePath) {
    if (filePath.startsWith('file://') || filePath.startsWith('content://')) {
        return filePath;
    }
    return `file://${filePath}`;
}

/* -------------------------------------------------------------------------- */
/*                         PUBLIC SHARE FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

/**
 * Share file using SYSTEM SHARE SHEET
 * ----------------------------------
 * This opens Android / iOS native share UI
 * User can select WhatsApp, Drive, Mail, Bluetooth, etc.
 *
 * @param {Object} params
 * @param {string} params.filePath - Local file path (required)
 * @param {string} params.fileType - File extension (default: pdf)
 * @param {string} params.fileTitle - Share dialog title
 */
export async function shareFileOpen({
    filePath,
    fileType = 'pdf',
    fileTitle,
}) {
    try {
        if (!filePath || typeof filePath !== 'string') {
            console.warn('shareFileOpen: invalid filePath', filePath);
            return;
        }

        const uri = normalizeUri(filePath);
        const type = mimeMap[fileType] || DEFAULT_MIME;

        await Share.open({
            url: uri,
            type,
            title: fileTitle || 'Share File',
            failOnCancel: false,
        });
    } catch (error) {
        console.error('shareFileOpen error:', error);
    }
}

/**
 * Share file DIRECTLY TO WHATSAPP
 * ------------------------------
 * This bypasses the system share sheet
 * and opens WhatsApp directly.
 *
 * NOTE:
 * - Works ONLY if WhatsApp is installed
 * - File MUST be local
 *
 * @param {Object} params
 * @param {string} params.filePath - Local file path (required)
 * @param {string} params.fileType - File extension (default: pdf)
 */
export async function shareFileToWhatsApp({
    filePath,
    fileType = 'pdf',
}) {
    try {
        if (!filePath || typeof filePath !== 'string') {
            console.warn('shareFileToWhatsApp: invalid filePath', filePath);
            return;
        }

        const uri = normalizeUri(filePath);
        const type = mimeMap[fileType] || DEFAULT_MIME;

        await Share.shareSingle({
            url: uri,
            type,
            social: Share.Social.WHATSAPP,
            failOnCancel: false,
        });
    } catch (error) {
        console.error('shareFileToWhatsApp error:', error);
    }
}