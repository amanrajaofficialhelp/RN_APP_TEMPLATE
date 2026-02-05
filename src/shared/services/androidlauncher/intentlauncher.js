import { Platform } from 'react-native';
import IntentLauncher from '@angelkrak/react-native-intent-launcher';

export const startVoiceSearch = async () => {
    if (Platform.OS !== 'android') return;

    try {
        const result = await IntentLauncher.startActivity({
            action: 'android.speech.action.RECOGNIZE_SPEECH',
            extras: {
                'android.speech.extra.LANGUAGE_MODEL': 'free_form',
                'android.speech.extra.LANGUAGE': 'en-IN',
                'android.speech.extra.PROMPT': 'Speak now',
                'android.speech.extra.MAX_RESULTS': 1,
            },
        });

        const text =
            result?.extra?.['android.speech.extra.RESULTS']?.[0];
        return text;
    } catch (err) {
        console.log('Voice cancelled / failed', err);
        return null;
    }
};
