/**
 * ---------------------------------------------------------
 *  REQUIRED PERMISSIONS (Add based on the functions you use)
 * ---------------------------------------------------------
 *
 *  ------------ ANDROID (AndroidManifest.xml) --------------
 *
 *  <!-- Camera -->
 *  <uses-permission android:name="android.permission.CAMERA" />
 *
 *  <!-- Microphone -->
 *  <uses-permission android:name="android.permission.RECORD_AUDIO" />
 *
 *  <!-- Read / Write Storage (Android 12 or lower) -->
 *  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
 *  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 *
 *  <!-- Android 13+ media permissions -->
 *  <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
 *  <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
 *  <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
 *
 *  <!-- Contacts -->
 *  <uses-permission android:name="android.permission.READ_CONTACTS" />
 *
 *  <!-- Calendar -->
 *  <uses-permission android:name="android.permission.READ_CALENDAR" />
 *  <uses-permission android:name="android.permission.WRITE_CALENDAR" />
 *
 *  <!-- Bluetooth -->
 *  <uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
 *  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
 *
 *  <!-- Phone / Call -->
 *  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
 *
 *  <!-- SMS -->
 *  <uses-permission android:name="android.permission.SEND_SMS" />
 *
 *  ---------------------------------------------------------
 *
 *  ----------------- iOS (Info.plist) -----------------------
 *
 *  <key>NSCameraUsageDescription</key>
 *  <string>This app requires camera access.</string>
 *
 *  <key>NSMicrophoneUsageDescription</key>
 *  <string>This app needs microphone access.</string>
 *
 *  <key>NSPhotoLibraryUsageDescription</key>
 *  <string>This app needs access to your photos.</string>
 *
 *  <key>NSContactsUsageDescription</key>
 *  <string>This app needs access to contacts.</string>
 *
 *  <key>NSCalendarsUsageDescription</key>
 *  <string>This app needs access to your calendar.</string>
 *
 *  <key>NSBluetoothAlwaysUsageDescription</key>
 *  <string>This app needs Bluetooth access.</string>
 *
 * ---------------------------------------------------------
 */

import { Platform } from 'react-native';
import {
    check,
    request,
    RESULTS,
    PERMISSIONS,
} from 'react-native-permissions';

/** Helper function */
const askPermission = async (perm) => {
    const status = await check(perm);

    if (status === RESULTS.GRANTED) return true;
    if (status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE) return false;

    const req = await request(perm);
    return req === RESULTS.GRANTED;
};

/* ---------------------------------------------------------
   CAMERA PERMISSION
--------------------------------------------------------- */
export const requestCameraPermission = () => {
    return askPermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA
    );
};

/* ---------------------------------------------------------
   MICROPHONE PERMISSION
--------------------------------------------------------- */
export const requestMicrophonePermission = () => {
    return askPermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.RECORD_AUDIO
            : PERMISSIONS.IOS.MICROPHONE
    );
};

/* ---------------------------------------------------------
   MEDIA / STORAGE PERMISSION
--------------------------------------------------------- */
export const requestMediaPermission = () => {
    if (Platform.OS === 'android') {
        return askPermission(
            Platform.Version >= 33
                ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        );
    } else {
        return askPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
};

/* ---------------------------------------------------------
   CONTACTS PERMISSION
--------------------------------------------------------- */
export const requestContactsPermission = () => {
    return askPermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_CONTACTS
            : PERMISSIONS.IOS.CONTACTS
    );
};

/* ---------------------------------------------------------
   CALENDAR PERMISSION
--------------------------------------------------------- */
export const requestCalendarPermission = () => {
    return askPermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_CALENDAR
            : PERMISSIONS.IOS.CALENDARS
    );
};

/* ---------------------------------------------------------
   BLUETOOTH PERMISSION
--------------------------------------------------------- */
export const requestBluetoothPermission = () => {
    return askPermission(
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
            : PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
    );
};

/* ---------------------------------------------------------
   PHONE STATE PERMISSION (Android Only)
--------------------------------------------------------- */
export const requestPhoneStatePermission = () => {
    if (Platform.OS === 'android') {
        return askPermission(PERMISSIONS.ANDROID.READ_PHONE_STATE);
    }
    return Promise.resolve(false);
};

/* ---------------------------------------------------------
   SMS PERMISSION (Android Only)
--------------------------------------------------------- */
export const requestSmsPermission = () => {
    if (Platform.OS === 'android') {
        return askPermission(PERMISSIONS.ANDROID.SEND_SMS);
    }
    return Promise.resolve(false);
};