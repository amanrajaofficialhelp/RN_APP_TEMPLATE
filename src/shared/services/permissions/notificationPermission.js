/**
 * ---------------------------------------------------------
 *  REQUIRED PERMISSIONS
 * ---------------------------------------------------------
 *
 *  ANDROID → Add this in AndroidManifest.xml
 *
 *  <!-- Android 13+ (API 33+) requires POST NOTIFICATIONS permission -->
 *  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
 *
 *  NOTE:
 *  - Android 12 and below do NOT require runtime notification permission
 *  - React Native handles channels automatically but you may add them manually
 *
 *  ---------------------------------------------------------
 *
 *  iOS → Add these keys in ios/YourApp/Info.plist
 *
 *  <key>NSUserNotificationUsageDescription</key>
 *  <string>This app would like to send you notifications.</string>
 *
 *  (Optional but recommended for better compatibility:)
 *  <key>UIBackgroundModes</key>
 *  <array>
 *      <string>remote-notification</string>
 *  </array>
 *
 * ---------------------------------------------------------
 */

import { Platform } from 'react-native';
import { checkNotifications, requestNotifications, RESULTS } from 'react-native-permissions';

const notificationPermission = async () => {
    try {

        // -------------------------------
        // ANDROID
        // -------------------------------
        if (Platform.OS === 'android') {

            // Android 13+ (API 33+) needs POST_NOTIFICATIONS permission
            if (Platform.Version >= 33) {
                const { status: currentStatus } = await checkNotifications();

                if (currentStatus === RESULTS.GRANTED) return true;
                if (currentStatus === RESULTS.BLOCKED || currentStatus === RESULTS.UNAVAILABLE) return false;

                // Ask for notification permission
                const { status: newStatus } = await requestNotifications(['alert', 'sound', 'badge']);
                return newStatus === RESULTS.GRANTED;
            }

            // Android < 13: notifications are always allowed
            return true;
        }

        // -------------------------------
        // iOS
        // -------------------------------
        const { status: iosStatus } = await checkNotifications();
        console.log('iOS notification permission status:', iosStatus);

        if (iosStatus === RESULTS.GRANTED) return true;
        if (iosStatus === RESULTS.BLOCKED || iosStatus === RESULTS.UNAVAILABLE) return false;

        // Request permission
        const { status: requestedIos } = await requestNotifications(['alert', 'sound']);
        console.log('iOS requested permission status:', requestedIos);

        return requestedIos === RESULTS.GRANTED;

    } catch (error) {
        console.warn('Notification permission error:', error);
        return false;
    }
};

export default notificationPermission;