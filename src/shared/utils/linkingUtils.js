import { Linking, Alert, Platform } from 'react-native'

/**
 * Open phone dialer with number
 * @param {string} phoneNumber
 */
export const openDialer = async (phoneNumber) => {
    try {
        if (!phoneNumber) {
            Alert.alert('Error', 'Phone number is required')
            return
        }

        const url = `tel:${phoneNumber}`
        const supported = await Linking.canOpenURL(url)

        if (!supported) {
            Alert.alert('Error', 'Phone call is not supported on this device')
            return
        }

        await Linking.openURL(url)
    } catch (error) {
        console.log('openDialer error:', error)
    }
}

/**
 * Open email client with recipient
 * @param {string} email
 * @param {string} subject
 * @param {string} body
 */
export const openEmail = async (email, subject = '', body = '') => {
    try {
        if (!email) {
            Alert.alert('Error', 'Email address is required')
            return
        }

        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        const supported = await Linking.canOpenURL(url)

        if (!supported) {
            Alert.alert('Error', 'Email client is not available')
            return
        }

        await Linking.openURL(url)
    } catch (error) {
        console.log('openEmail error:', error)
    }
}

/**
 * Open external browser link
 * @param {string} url
 */
export const openBrowser = async (url) => {
    console.log('Open in browser ', url)
    try {
        if (!url) {
            Alert.alert('Error', 'URL is required')
            return
        }

        const formattedUrl = url.startsWith('http') ? url : `https://${url}`
        const supported = await Linking.canOpenURL(formattedUrl)

        if (!supported) {
            Alert.alert('Error', 'Cannot open the provided URL')
            return
        }

        await Linking.openURL(formattedUrl)
    } catch (error) {
        console.log('openBrowser error:', error)
    }
}