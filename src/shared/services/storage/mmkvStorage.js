import { createMMKV } from 'react-native-mmkv'

/**
 * MMKV STORAGE ADAPTER FOR REDUX-PERSIST
 * Supports new API (createMMKV)
 */

// Create a single shared MMKV instance
export const mmkv = createMMKV({
    id: 'redux-persist-storage',
})

export const mmkvStorage = {
    /**
     * Set a value (must be string for redux-persist)
     */
    setItem(key, value) {
        try {
            mmkv.set(key, value)
            return Promise.resolve(true)
        } catch (error) {
            console.error('[MMKV setItem] error:', error)
            return Promise.reject(error)
        }
    },

    /**
     * Get a string value by key
     */
    getItem(key) {
        try {
            const value = mmkv.getString(key)
            return Promise.resolve(value ?? null)
        } catch (error) {
            console.error('[MMKV getItem] error:', error)
            return Promise.reject(error)
        }
    },

    /**
     * Remove item by key
     */
    removeItem(key) {
        try {
            mmkv.remove(key)
            return Promise.resolve()
        } catch (error) {
            console.error('[MMKV removeItem] error:', error)
            return Promise.reject(error)
        }
    },
}
