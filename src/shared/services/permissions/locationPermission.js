/**
 * ---------------------------------------------------------
 *  REQUIRED PERMISSIONS
 * ---------------------------------------------------------
 *
 *  ANDROID → Add these in android/app/src/main/AndroidManifest.xml
 *
 *  <!-- Foreground Location -->
 *  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
 *  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
 *
 *  <!-- Background Location (only if required) -->
 *  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
 *
 *  ---------------------------------------------------------
 *
 *  iOS → Add these in ios/YourApp/Info.plist
 *
 *  <key>NSLocationWhenInUseUsageDescription</key>
 *  <string>This app needs your location while using the app.</string>
 *
 *  <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
 *  <string>This app needs background location access.</string>
 *
 *  <key>NSLocationAlwaysUsageDescription</key>
 *  <string>Background location helps us improve features.</string>
 *
 * ---------------------------------------------------------
 */

import { Platform } from 'react-native';
import {
    check,
    request,
    PERMISSIONS,
    RESULTS
} from 'react-native-permissions';

const locationPermission = async (needBackground = false) => {
    try {
        let foregroundPermission;
        let backgroundPermission;

        // ---------------------------------------------------------
        // ANDROID PERMISSIONS
        // ---------------------------------------------------------
        if (Platform.OS === 'android') {
            foregroundPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
            backgroundPermission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

            // 1. Check Foreground
            const fgStatus = await check(foregroundPermission);

            if (fgStatus === RESULTS.GRANTED) {
                // 2. Check background if required
                if (needBackground && Platform.Version >= 29) {
                    const bgStatus = await check(backgroundPermission);

                    if (bgStatus === RESULTS.GRANTED) return true;

                    if (bgStatus === RESULTS.DENIED) {
                        const reqBg = await request(backgroundPermission);
                        return reqBg === RESULTS.GRANTED;
                    }

                    return false;
                }

                return true; // Foreground granted
            }

            if (fgStatus === RESULTS.BLOCKED || fgStatus === RESULTS.UNAVAILABLE) {
                return false;
            }

            // Request Foreground
            const reqFg = await request(foregroundPermission);
            if (reqFg !== RESULTS.GRANTED) return false;

            // Request Background if needed
            if (needBackground && Platform.Version >= 29) {
                const reqBg = await request(backgroundPermission);
                return reqBg === RESULTS.GRANTED;
            }

            return true;
        }

        // ---------------------------------------------------------
        // iOS PERMISSIONS
        // ---------------------------------------------------------
        foregroundPermission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        backgroundPermission = PERMISSIONS.IOS.LOCATION_ALWAYS;

        const iosStatus = await check(foregroundPermission);

        if (iosStatus === RESULTS.GRANTED) {
            if (needBackground) {
                const bgStatus = await check(backgroundPermission);
                if (bgStatus === RESULTS.GRANTED) return true;

                const reqBg = await request(backgroundPermission);
                return reqBg === RESULTS.GRANTED;
            }

            return true;
        }

        if (iosStatus === RESULTS.BLOCKED || iosStatus === RESULTS.UNAVAILABLE) {
            return false;
        }

        // Request Foreground
        const reqIOSSFg = await request(foregroundPermission);
        if (reqIOSSFg !== RESULTS.GRANTED) return false;

        // Request Background if needed
        if (needBackground) {
            const reqBG = await request(backgroundPermission);
            return reqBG === RESULTS.GRANTED;
        }

        return true;

    } catch (error) {
        console.warn("Location permission error:", error);
        return false;
    }
};

export default locationPermission;