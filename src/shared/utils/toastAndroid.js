import { Platform, ToastAndroid, Alert } from "react-native";

/**
 * Toast / Alert Utility
 * -------------------------------------------------
 * WHY THIS FILE EXISTS:
 * -------------------------------------------------
 * React Native does NOT provide a single cross-platform
 * API for toast messages.
 *
 * - Android has native `ToastAndroid`
 * - iOS does NOT have a native toast, so we use `Alert`
 *
 * This utility:
 * ✅ Provides ONE unified API for showing messages
 * ✅ Automatically handles Android vs iOS internally
 * ✅ Keeps UI code clean and platform-independent
 *
 * BENEFITS:
 * -------------------------------------------------
 * - No Platform.OS checks scattered across screens
 * - Consistent message handling across the app
 * - Easy to replace Alert with a custom toast later (e.g. Snackbar)
 *
 * HOW TO USE:
 * -------------------------------------------------
 * import { showToast } from '@/utils/toast'
 * showToast('Profile updated successfully')
 */

/**
 * Show a simple short message to the user
 *
 * ANDROID:
 * - Uses native Toast (SHORT duration)
 *
 * iOS:
 * - Uses Alert as fallback
 *
 * USE CASE:
 * - Success messages
 * - Small warnings
 * - Informational messages
 */
export const showToast = (message) => {
    if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert("", message);
    }
};

/**
 * Show toast message at the CENTER of the screen
 *
 * ANDROID:
 * - Toast with CENTER gravity
 *
 * iOS:
 * - Alert fallback
 *
 * USE CASE:
 * - Important messages
 * - Validation errors
 * - Messages that need more attention
 */
export const showToastWithGravity = (message) => {
    if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    } else {
        Alert.alert("", message);
    }
};

/**
 * Show toast message with custom position offset
 *
 * ANDROID:
 * - Toast positioned at BOTTOM with offset
 *
 * iOS:
 * - Alert fallback
 *
 * USE CASE:
 * - Form validation messages
 * - Network / API status messages
 * - Messages that should not block UI interaction
 */
export const showToastWithGravityAndOffset = (message) => {
    if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,  // X offset
            50   // Y offset
        );
    } else {
        Alert.alert("", message);
    }
};