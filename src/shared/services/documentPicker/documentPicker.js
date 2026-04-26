import { pick, saveDocuments, types } from '@react-native-documents/picker'

async function handlePickDocument() {
    try {
        const result = await pick({
            allowMultiSelection: true,
            type: [
                types.pdf,
                types.doc,
                types.docx,
                types.xls,
                types.xlsx,
                // types.images, // still needed
                'image/jpeg',
                'image/png',
                'image/heic', // optional
            ],
        })

        // 🔥 Filter out GIF files
        const filteredResult = result.filter(item => {
            const isGifMime = item?.type === 'image/gif'
            const isGifName = item?.name?.toLowerCase().endsWith('.gif')
            return !isGifMime && !isGifName
        })

        console.log("filteredResult", filteredResult)
        return filteredResult
    } catch (error) {
        console.log("error", error)
        return Promise.reject(error)
    }
}

async function handleSaveDocuments() {
    try {
        const result = await saveDocuments({
            sourceUris: ['some file uri'],
            copy: false,
            mimeType: 'text/plain',
            fileName: 'some file name',
        })
        console.log("result", result)
    } catch (error) {
        console.log("error", error)
    }
}

export { handlePickDocument, handleSaveDocuments }