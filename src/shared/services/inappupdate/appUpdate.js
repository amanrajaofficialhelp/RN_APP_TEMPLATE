/**
 * In-App Update Service
 * ---------------------
 * This service checks whether a new app update is available
 * and triggers Google Play / App Store in-app update flow.
 *
 * Update Modes:
 * - FORCED   → Immediate update (user must update)
 * - FLEXIBLE → Flexible update (user can postpone)
 *
 * NOTE:
 * - Android supports IMMEDIATE & FLEXIBLE updates
 * - iOS behavior depends on App Store configuration
 */

import { Platform } from 'react-native'
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates'

// Enable debug logs in development
const inAppUpdates = new SpInAppUpdates(__DEV__)

/**
 * Checks for app updates and starts update flow if required.
 *
 * @param {('FORCED' | 'FLEXIBLE')} appCond
 * - FORCED   → Immediate update
 * - FLEXIBLE → Flexible update
 * @returns {Promise<{shouldUpdate: boolean, type: string}>}
 */
export const checkAppUpdate = async (appCond = 'FORCED') => {
    try {
        const result = await inAppUpdates.checkNeedsUpdate()
        if (!result?.shouldUpdate) return { shouldUpdate: false, type: appCond }

        const updateType = appCond === 'FORCED' ? IAUUpdateKind.IMMEDIATE : IAUUpdateKind.FLEXIBLE
        const updateOptions = { updateType }

        // Start the update flow
        await inAppUpdates.startUpdate(updateOptions)

        return { shouldUpdate: true, type: appCond }
    } catch (error) {
        // If it was forced and we got an error (e.g. user cancelled on Android), 
        // we might still want to show our forced update screen
        return { shouldUpdate: appCond === 'FORCED', type: appCond }
    }
}