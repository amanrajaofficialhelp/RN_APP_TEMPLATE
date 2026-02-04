import * as Keychain from 'react-native-keychain'

/**
 * Secure Storage Helper using react-native-keychain
 *
 * ─────────────────────────────────────────────
 * Terminology:
 *
 * service  → WHAT is being stored
 *            Examples:
 *            - ACCESS_TOKEN
 *            - REFRESH_TOKEN
 *            - BIOMETRIC_KEY
 *
 * username → WHO the data belongs to
 *            Examples:
 *            - userId (recommended)
 *            - email
 *
 * value    → Actual sensitive data
 *            (Stored internally as a JSON string)
 * ─────────────────────────────────────────────
 *
 * Defaults:
 * - `service` defaults to 'ACCESS_TOKEN'
 *
 * Best Practices:
 * - Use ONE service per secret type
 * - Prefer userId over email for username
 * - Never store sensitive data in `username`
 *
 * ─────────────────────────────────────────────
 * Usage Examples:
 *
 * // Store auth tokens
 * await setSecureItem({
 *   username: user.id,
 *   value: {
 *     accessToken,
 *     refreshToken,
 *   },
 * })
 *
 * // Read auth tokens
 * const data = await getSecureItem()
 * console.log(data?.username)
 * console.log(data?.value?.accessToken)
 *
 * // Store another secure value
 * await setSecureItem({
 *   service: 'BIOMETRIC_KEY',
 *   username: user.id,
 *   value: { enabled: true },
 * })
 *
 * // Delete auth tokens (logout)
 * await deleteSecureItem()
 * ─────────────────────────────────────────────
 */


/* ---------------- SET ---------------- */

async function setSecureItem({
    service = 'ACCESS_TOKEN',
    username = 'USER_TOKEN',
    value,
} = {}) {
    try {
        if (!username) {
            throw new Error('username is required')
        }
        // console.log('setSecureItem raw data --> ', service, username, value)
        const jsonValue = JSON.stringify(value)
        // console.log('setSecureItem json data --> ', service, username, jsonValue)
        const res = await Keychain.setGenericPassword(
            username,
            jsonValue,
            { service }
        )
        // console.log('setSecureItem result --> ', service, username, res)
    } catch (error) {
        console.error(`Error setting secure item [${service}]:`, error)
    }
}

/* ---------------- GET ---------------- */

async function getSecureItem({
    service = 'ACCESS_TOKEN',
} = {}) {
    try {
        // console.log('getSecureItem service --> ', service)
        const credentials = await Keychain.getGenericPassword({ service })
        // console.log('getSecureItem result --> ', service, credentials)
        if (!credentials) return null

        return {
            service,
            username: credentials.username,
            value: JSON.parse(credentials.password),
        }
    } catch (error) {
        console.error(`Error getting secure item [${service}]:`, error)
        return null
    }
}

/* ---------------- DELETE ---------------- */

async function deleteSecureItem({
    service = 'ACCESS_TOKEN',
} = {}) {
    try {
        // console.log('deleteSecureItem service --> ', service)
        const res = await Keychain.resetGenericPassword({ service })
        // console.log('deleteSecureItem result --> ', service, res)
    } catch (error) {
        console.error(`Error deleting secure item [${service}]:`, error)
    }
}

/* ---------------- EXPORTS ---------------- */

export {
    setSecureItem,
    getSecureItem,
    deleteSecureItem,
}