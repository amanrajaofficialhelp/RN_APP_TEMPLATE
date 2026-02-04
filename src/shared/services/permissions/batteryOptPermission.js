import { Platform } from 'react-native'
import { BatteryOptEnabled, RequestDisableOptimization } from 'react-native-battery-optimization-check'

/**
 * Battery Optimization Helper
 * ─────────────────────────────────────────────
 *
 * Purpose:
 * - Checks whether Android battery optimization is enabled
 * - Requests the user to disable it (if enabled)
 *
 * Why this is important:
 * - Android may kill background services aggressively
 * - Push notifications may delay or fail
 * - Background sync, location tracking, alarms may stop
 *
 * Suitable for apps that use:
 * - Push notifications
 * - Background tasks / services
 * - Location tracking
 * - Order / ride / pharmacy / delivery apps
 *
 * ⚠️ Platform Limitation:
 * - Works ONLY on Android
 * - iOS does not support battery optimization control
 *
 * ─────────────────────────────────────────────
 * Usage Examples:
 *
 * // Ask for permission
 * const allowed = await requestBatteryOptimization()
 *
 * if (allowed) {
 *   console.log('Battery optimization disabled')
 * }
 *
 * ─────────────────────────────────────────────
 *
 * @returns {Promise<boolean>}
 * - true  → User allowed disabling optimization
 * - false → Already disabled / user denied / non-Android
 */


/* =========================================================
   REQUEST BATTERY OPTIMIZATION DISABLE
   ========================================================= */

async function requestBatteryOptimization() {
    try {
        // Battery optimization exists only on Android
        if (Platform.OS !== 'android') {
            return false
        }

        // Check if optimization is enabled for this app
        const isEnabled = await BatteryOptEnabled()
        // console.log("Battery optimization enabled -->", isEnabled)

        // If enabled, request user to disable it
        if (isEnabled) {
            const res = await RequestDisableOptimization()
            // console.log("Battery optimization disabled -->", res)
            return res
        }

        // Already disabled
        return false
    } catch (error) {
        console.error(
            '❌ Battery Optimization check/request error:',
            error
        )
        return false
    }
}


/* =========================================================
   EXPORT
   ========================================================= */

export {
    requestBatteryOptimization,
}