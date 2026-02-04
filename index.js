/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';
// import { foregroundMessage, backgroundMessageHandler } from './src/shared/services/firebase/notification'
// import { setupNotificationListeners } from './src/shared/services/notifee/notifee';

// foregroundMessage()
// backgroundMessageHandler()
// setupNotificationListeners()

AppRegistry.registerComponent(appName, () => App);
