import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';

/**
 * Create and display a custom local notification.
 */
export async function createNotification(message) {
    try {
        await notifee.requestPermission({ alert: true, badge: true, sound: true });

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'General Notifications',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
        });

        const id = message?.messageId || `msg_${Date.now()}`;
        const title = message?.notification?.title || 'New Notification';
        const body = message?.notification?.body || 'You have a new message';

        await notifee.displayNotification({
            id,
            title,
            body,
            badge: 5,
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                pressAction: { id: 'default' },
            },
            ios: { categoryId: 'default' },
        });
    } catch (error) {
        console.log('Error showing notification:', error);
    }
}

/**
 * Show a notification for a download in progress.
 */
export async function showDownloadNotification({ id, title, body }) {
    try {
        await notifee.requestPermission({ alert: true, badge: true, sound: true });

        const channelId = await notifee.createChannel({
            id: 'downloads_v2', // Changed ID to force update on existing installs
            name: 'Downloads',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
            sound: 'default',
        });

        await notifee.displayNotification({
            id,
            title: title || 'Downloading...',
            body: body || 'File is being downloaded',
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                importance: AndroidImportance.HIGH,
                sound: 'default',
                progress: {
                    indeterminate: true,
                },
                ongoing: true, // Prevents user from dismissing it
                onlyAlertOnce: true,
            },
        });
    } catch (error) {
        console.log('Error showing download notification:', error);
    }
}

/**
 * Update a notification to show download is complete.
 */
export async function updateDownloadCompleteNotification({ id, title, body, filePath }) {
    try {
        await notifee.requestPermission({ alert: true, badge: true, sound: true });

        const channelId = await notifee.createChannel({
            id: 'downloads_v2',
            name: 'Downloads',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
            sound: 'default',
        });

        await notifee.displayNotification({
            id,
            title: title || 'Download Complete',
            body: body || 'File has been saved to Downloads.',
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                importance: AndroidImportance.HIGH,
                sound: 'default',
                ongoing: false,
                pressAction: {
                    id: 'open_file',
                    launchActivity: 'default',
                },
                actions: [
                    {
                        title: 'Open PDF',
                        pressAction: {
                            id: 'open_file',
                        },
                    },
                ],
            },
            data: {
                filePath,
            }
        });
    } catch (error) {
        console.log('Error updating download notification:', error);
    }
}

/**
 * Cancel a specific notification by ID
 */
export async function cancelNotification(id) {
    try {
        await notifee.cancelNotification(id);
    } catch (error) {
        console.log('Error canceling notification:', error);
    }
}

/**
 * Cancel all notifications
 */
export async function cancelAllNotifications() {
    try {
        await notifee.cancelAllNotifications();
    } catch (error) {
        console.log('Error canceling all notifications:', error);
    }
}

/**
 * Get list of all displayed notifications
 */
export async function getDisplayedNotifications() {
    try {
        const notifications = await notifee.getDisplayedNotifications();
        console.log('Currently displayed notifications:', notifications.length);
        return notifications;
    } catch (error) {
        console.log('Error getting notifications:', error);
        return [];
    }
}

/**
 * Setup both foreground and background notification listeners
 * Call this once in index.js
 */
export async function setupNotificationListeners() {
    // Foreground events
    notifee.onForegroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        if (type === EventType.PRESS) {
            console.log('Foreground notification pressed:', notification);

            // Handle PDF opening if action is open_file
            if (pressAction?.id === 'open_file' && notification.data?.filePath) {
                const { shareFileOpen } = require('../share/shareFileService');
                shareFileOpen({ filePath: notification.data.filePath });
            }

            // Optional: reset badge if message is opened
            await clearBadge();
        } else if (type === EventType.DISMISSED) {
            console.log('Foreground notification dismissed:', notification);
        } else if (type === EventType.ACTION_PRESS) {
            if (pressAction?.id === 'open_file' && notification.data?.filePath) {
                const { shareFileOpen } = require('../share/shareFileService');
                shareFileOpen({ filePath: notification.data.filePath });
            }
        } else {
            // For new notifications
            await updateBadgeCount();
        }
    });


    // Background events
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        if (type === EventType.PRESS) {
            console.log('Background notification pressed:', notification?.id);

            if (pressAction?.id === 'open_file' && notification?.data?.filePath) {
                const { shareFileOpen } = require('../share/shareFileService');
                shareFileOpen({ filePath: notification.data.filePath });
            }

            await clearBadge(); // User opened notification, reset badge
        } else if (type === EventType.DISMISSED) {
            console.log('Background notification dismissed:', notification?.id);
        } else if (type === EventType.ACTION_PRESS) {
            if (pressAction?.id === 'open_file' && notification?.data?.filePath) {
                const { shareFileOpen } = require('../share/shareFileService');
                shareFileOpen({ filePath: notification.data.filePath });
            }
        } else {
            await updateBadgeCount(); // New notification received
        }
    });

}



// Set badge count
export async function updateBadgeCount() {
    try {
        const notifications = await notifee.getDisplayedNotifications();
        const count = notifications.length; // Or any custom unread count logic
        await notifee.setBadgeCount(count);
    } catch (error) {
        console.log('Error updating badge count:', error);
    }
}

export async function setUnreadBadge(count) {
    try {
        await notifee.setBadgeCount(count); // count can be any number
        console.log('Badge updated:', count);
    } catch (err) {
        console.log('Error setting badge:', err);
    }
}

// Clear badge count when opening the app or reading messages
async function clearBadge() {
    try {
        await notifee.setBadgeCount(0);
    } catch (error) {
        console.log('Error clearing badge count:', error);
    }
}