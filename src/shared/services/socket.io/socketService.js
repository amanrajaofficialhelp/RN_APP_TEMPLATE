/**
 * Socket Service
 * =====================================================
 * WHY THIS FILE EXISTS:
 * ---------------------
 * This service manages a SINGLE socket.io connection
 * for the entire application.
 *
 * Instead of creating socket connections inside screens
 * or redux logic, this service:
 * - Ensures only one socket connection exists
 * - Centralizes connect / disconnect logic
 * - Avoids memory leaks & duplicate listeners
 * - Keeps socket logic independent from UI
 *
 *
 * HOW TO USE:
 * -----------
 * import SocketService from '@/services/socketService'
 *
 * SocketService.connect(token)
 * SocketService.emit('event-name', data)
 * SocketService.on('event-name', callback)
 * SocketService.off('event-name')
 * SocketService.disconnect()
 *
 *
 * PUBLIC FUNCTIONS:
 * -----------------
 * 1. connect(token)
 *    → Establish socket connection (only once)
 *
 * 2. disconnect()
 *    → Disconnect socket and clean up
 *
 * 3. emit(eventName, data)
 *    → Send event to server
 *
 * 4. on(eventName, callback)
 *    → Listen to server event
 *
 * 5. off(eventName)
 *    → Remove event listener
 */

import io from 'socket.io-client';

/**
 * INTERNAL SOCKET INSTANCE
 * -----------------------------------------------------
 * - Must exist to keep a single active connection
 * - NOT exposed outside this service
 * - NOT a public flag
 */
let socketInstance = null;

/**
 * Backend socket URL
 */
const SOCKET_URL = 'https://api.rebucabs.com';

/**
 * Establish socket connection.
 *
 * HOW IT WORKS:
 * -------------
 * - Creates socket connection only if not already connected
 * - Uses WebSocket transport for better performance
 * - Enables auto-reconnection with infinite retries
 * - Keeps connection alive across app screens
 *
 * WHEN TO CALL:
 * -------------
 * - After user login
 * - When auth token becomes available
 */
function connect(token) {
    if (socketInstance) {
        return socketInstance;
    }

    socketInstance = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 2000,
        timeout: 20000,
        forceNew: true,
        // auth: token ? { token } : undefined, // enable if backend requires auth
    });

    /**
     * Core socket lifecycle events
     */
    socketInstance.on('connect', () => {
        console.log('✅ Socket connected:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
        console.log('❌ Socket disconnected');
    });

    /**
     * Debug listener for all incoming events
     * (Enable only during development)
     */
    socketInstance.onAny((event, ...args) => {
        console.log('📡 Socket event:', event, args);
    });

    return socketInstance;
}

/**
 * Disconnect socket connection.
 *
 * HOW IT WORKS:
 * -------------
 * - Disconnects active socket
 * - Clears internal reference
 * - Ensures clean logout or app shutdown
 *
 * WHEN TO CALL:
 * -------------
 * - On logout
 * - When user session expires
 */
function disconnect() {
    if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
        console.log('🔌 Socket disconnected manually');
    }
}

/**
 * Emit event to socket server.
 *
 * HOW IT WORKS:
 * -------------
 * - Sends event only if socket is connected
 * - Prevents crashes if socket is not initialized
 *
 * @param {string} eventName
 * @param {object} data
 */
function emit(eventName, data) {
    if (socketInstance) {
        socketInstance.emit(eventName, data);
    }
}

/**
 * Listen to socket event.
 *
 * HOW IT WORKS:
 * -------------
 * - Registers event listener on active socket
 * - Should be paired with `off()` to prevent duplicates
 *
 * @param {string} eventName
 * @param {Function} callback
 */
function on(eventName, callback) {
    if (socketInstance) {
        socketInstance.on(eventName, callback);
    }
}

/**
 * Remove socket event listener.
 *
 * HOW IT WORKS:
 * -------------
 * - Removes listener for a specific event
 * - Prevents memory leaks & duplicate callbacks
 *
 * @param {string} eventName
 */
function off(eventName) {
    if (socketInstance) {
        socketInstance.off(eventName);
    }
}

/**
 * SINGLE EXPORT OBJECT
 * =====================================================
 * Only documented public functions are exposed.
 */
const SocketService = {
    connect,
    disconnect,
    emit,
    on,
    off,
};

export default SocketService;
