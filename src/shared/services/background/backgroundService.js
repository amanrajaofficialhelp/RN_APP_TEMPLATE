import BackgroundService from 'react-native-background-actions'
import { AppState } from 'react-native'
import { stopUserLocationWatch, watchUserCurrentLocation } from '../../utils/Permissions/locationPermission'
import { openAppInForeground, showOrderPopup } from '../../utils/AppOpener'

/**
 * Background Service Helper
 * ─────────────────────────────────────────────
 *
 * Purpose:
 * - Run long-running tasks even when the app is
 *   in background or killed (Android)
 *
 * Use cases:
 * - Location tracking
 * - Heartbeat / socket keep-alive
 * - Sync tasks
 * - Background monitoring
 *
 * ⚠️ Notes:
 * - Android only (iOS has strict limitations)
 * - Battery optimization should be disabled
 * - Requires foreground notification
 *
 * ─────────────────────────────────────────────
 */


/* =========================================================
   INTERNAL STATE
   ========================================================= */

// Used to track background activity state
let backgroundSocketActive = false


/* =========================================================
   UTILS
   ========================================================= */

/**
 * Sleep utility for background loop
 * @param {number} ms
 */
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    })
}


/* =========================================================
   BACKGROUND TASK
   ========================================================= */

/**
 * Main background task logic
 * This function runs continuously while service is active
 *
 * @param {Object} taskDataArguments
 */
async function backgroundTask(taskDataArguments) {
    console.log('[BackgroundService] Service is running')

    const delay = taskDataArguments.delay
    backgroundSocketActive = true
    let counter = 0
    let lastEmittedLocation = null

    watchUserCurrentLocation(
        (position) => {
            const { latitude, longitude } = position.coords
            if (lastEmittedLocation && lastEmittedLocation.latitude === latitude && lastEmittedLocation.longitude === longitude) {
                return
            }
            lastEmittedLocation = { latitude, longitude }
            // console.log('[BG] New location detected:', latitude, longitude)
        },
        (error) => {
            console.error('[BG] Location error:', error)
        }
    )

    try {
        while (BackgroundService.isRunning()) {
            // console.log('[BG]', 'Running:', new Date().toLocaleTimeString(), 'State:', AppState.currentState, 'Count:', counter)

            // Show order popup every 10 iterations
            if (counter > 0 && counter % 10 === 0) {
                // showOrderPopup()
            }

            await BackgroundService.updateNotification({
                taskDesc: `Tracking location • ${new Date().toLocaleTimeString()}`,
            })
            await sleep(delay)
            counter++
        }
    } finally {
        // stopUserLocationWatch()
        // console.log('[BG] Background task stopped')
    }
}


/* =========================================================
   SERVICE OPTIONS
   ========================================================= */

const backgroundServiceOptions = {
    taskName: 'Background Task',
    taskTitle: 'Rebu Driver',
    taskDesc: 'Location tracking active',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
        package: 'com.rebupartner',
    },
    color: '#7ED957',
    linkingURI: 'rebuPartner://open',
    parameters: {
        delay: 1000,
    },
}


/* =========================================================
   PUBLIC FUNCTIONS
   ========================================================= */

/**
 * Start background service
 */
async function startBackgroundService() {
    try {
        if (BackgroundService.isRunning()) {
            console.log('[BackgroundService] Already running')
            return
        }

        // console.log('[BackgroundService] Starting service')
        await BackgroundService.start(
            backgroundTask,
            backgroundServiceOptions
        )
    } catch (error) {
        console.error('[BackgroundService] Start error:', error)
    }
}


/**
 * Stop background service [ VERI IMPORTANT ]
 */
async function stopBackgroundService() {
    try {
        if (!BackgroundService.isRunning()) {
            console.log('[BackgroundService] Not running')
            return
        }
        console.log('[BackgroundService] Stopping service')
        await BackgroundService.stop()
        backgroundSocketActive = false
    } catch (error) {
        console.error('[BackgroundService] Stop error:', error)
    }
}


/**
 * Ensure background service is running
 * (Useful for auto-start logic)
 */
async function ensureBackgroundServiceRunning() {
    if (!BackgroundService.isRunning()) {
        // console.log('[BackgroundService] Ensuring service is running')
        await startBackgroundService()
    }
}


/**
 * Check background socket/task status
 */
function isBackgroundServiceActive() {
    return backgroundSocketActive
}


/* =========================================================
   EXPORTS
   ========================================================= */

export {
    ensureBackgroundServiceRunning,
    isBackgroundServiceActive,
    startBackgroundService,
    stopBackgroundService
}
