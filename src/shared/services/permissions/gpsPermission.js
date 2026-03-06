import { Platform } from 'react-native';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

const checkAndEnableLocationServices = async () => {
    try {
        if (Platform.OS !== 'android') {
            return true;
        }

        const enabled = await isLocationEnabled();
        if (!enabled) {
            return await promptForEnableLocationIfNeeded();
        }
        return true;
    } catch (error) {
        console.error('Location services check error:', error);
        return false;
    }
};

export default checkAndEnableLocationServices;