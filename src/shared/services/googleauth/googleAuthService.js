import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import Config from 'react-native-config'

let isConfigured = false

/**
 * Internal auto configuration
 * Runs only once
 */
const autoConfigure = () => {
    if (isConfigured) return

    GoogleSignin.configure({
        webClientId: Config.GOOGLE_WEB_CLIENT_ID,
        offlineAccess: false,
    })

    isConfigured = true
}

/**
 * Google Sign-In
 * -----------------------------------
 * Auto configures internally
 *
 * @returns {string | null} idToken
 */
export const googleSignIn = async () => {
    try {
        autoConfigure()

        await GoogleSignin.hasPlayServices()
        await GoogleSignin.signOut() // ensures fresh login

        const userInfo = await GoogleSignin.signIn()

        const idToken = userInfo?.data?.idToken

        if (!idToken) {
            return null
        }

        return idToken
    } catch (error) {
        handleGoogleError(error)
        return null
    }
}

/**
 * Optional: Google Logout
 */
export const googleLogout = async () => {
    try {
        autoConfigure()
        await GoogleSignin.signOut()
    } catch (e) {
        console.log('Google logout error', e)
    }
}

/**
 * Error handler
 */
const handleGoogleError = (error) => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showToast('Google sign-in cancelled', 'error')
    } else if (error.code === statusCodes.IN_PROGRESS) {
        showToast('Google sign-in already in progress', 'error')
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showToast('Google Play Services not available', 'error')
    } else {
        console.log('Google Sign-In Error:', error)
        showToast('Google sign-in failed', 'error')
    }
}