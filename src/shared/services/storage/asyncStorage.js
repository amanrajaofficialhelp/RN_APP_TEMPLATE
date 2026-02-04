import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * AsyncStorage Helper
 *
 * ─────────────────────────────────────────────
 * Purpose:
 * - Used for NON-SENSITIVE data only
 * - Examples:
 *   - App preferences
 *   - Theme mode (light / dark / system)
 *   - Language selection
 *   - Cached API responses
 *   - Feature flags
 *
 * ⚠️ DO NOT USE for:
 * - Access tokens
 * - Refresh tokens
 * - Passwords
 * - Any sensitive or security-critical data
 *   (Use Keychain / Keystore instead)
 *
 * ─────────────────────────────────────────────
 * Usage Examples:
 *
 * // Store data
 * await setItem({
 *   key: 'APP_THEME',
 *   value: 'dark',
 * })
 *
 * // Read data
 * const theme = await getItem({ key: 'APP_THEME' })
 *
 * // Delete data
 * await deleteItem({ key: 'APP_THEME' })
 * ─────────────────────────────────────────────
 */


/* ---------------- SET ---------------- */

async function setItem({
    key,
    value,
}) {
    try {
        if (!key) {
            throw new Error('key is required')
        }

        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
        console.error(`Error setting item in AsyncStorage [${key}]:`, error)
    }
}

/* ---------------- GET ---------------- */

async function getItem({
    key,
}) {
    try {
        if (!key) {
            throw new Error('key is required')
        }

        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch (error) {
        console.error(`Error getting item from AsyncStorage [${key}]:`, error)
        return null
    }
}

/* ---------------- DELETE ---------------- */

async function deleteItem({
    key,
}) {
    try {
        if (!key) {
            throw new Error('key is required')
        }

        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.error(`Error deleting item from AsyncStorage [${key}]:`, error)
    }
}

/* ---------------- EXPORTS ---------------- */

export {
    setItem,
    getItem,
    deleteItem,
}