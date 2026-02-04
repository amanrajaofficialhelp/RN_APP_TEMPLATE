// phoneNumberHintService.js
import { Platform } from 'react-native';
import { showPhoneNumberHint } from '@shayrn/react-native-android-phone-number-hint';

export async function getPhoneNumberFromHint() {
    try {
        if (Platform.OS !== 'android') {
            return {
                success: false,
                phoneNumber: null,
                error: 'Phone number hint is only supported on Android.'
            };
        }

        // Opens the native phone number picker dialog
        const number = await showPhoneNumberHint()
        console.log('Phone response --> ', number)

        if (number) {
            return {
                success: true,
                phoneNumber: number, // already formatted by Google
                error: null
            };
        }

        return {
            success: false,
            phoneNumber: null,
            error: 'User cancelled or no number selected.'
        };

    } catch (err) {
        return {
            success: false,
            phoneNumber: null,
            error: err?.message || 'Unknown error occurred'
        };
    }
}