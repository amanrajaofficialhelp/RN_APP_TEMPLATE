import Tts from 'react-native-tts';

/**
 * TtsService - A reusable service for Text-to-Speech functionality.
 * Handles initialization and provides simple methods for speaking and stopping.
 */
class TtsService {
    constructor() {
        this.initialized = false;
        this._initTts();
    }

    /**
     * Initializes the TTS engine with default settings.
     * @private
     */
    async _initTts() {
        try {
            await Tts.getInitStatus();
            this.initialized = true;

            // Set default configurations
            // Tts.setDefaultLanguage('en-IN'); // Default to Indian English or user preference
            Tts.setDefaultLanguage('hi-IN');
            Tts.setDefaultRate(0.9, true);
            Tts.setDefaultPitch(1.0);

            // Clear any stuck utterances
            Tts.stop();

            console.log('TTS Service Initialized Successfully');
        } catch (error) {
            console.error('TTS Initialization Error:', error);
            if (error.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        }
    }

    /**
     * Starts speaking the provided text.
     * @param {string} text - The text to be spoken.
     * @param {object} options - Optional parameters for the speech (language, rate, etc.)
     */
    startSpeak(text, options = {}) {
        if (!text || typeof text !== 'string') {
            console.warn('TTS: Invalid text provided');
            return;
        }

        try {
            // Stop current speech before starting new one
            Tts.stop();

            if (options.language) Tts.setDefaultLanguage(options.language);
            if (options.rate) Tts.setDefaultRate(options.rate, true);
            if (options.pitch) Tts.setDefaultPitch(options.pitch);

            Tts.speak(text);
        } catch (error) {
            console.error('TTS: Error while starting speech', error);
        }
    }

    /**
     * Stops the current speech.
     */
    stopSpeak() {
        try {
            Tts.stop();
        } catch (error) {
            console.error('TTS: Error while stopping speech', error);
        }
    }

    /**
     * Adds an event listener to TTS events.
     * Useful for tracking 'tts-start', 'tts-finish', 'tts-error', etc.
     * @param {string} event - The event name.
     * @param {function} callback - The function to call when event occurs.
     * @returns {object} Subscription object that should be removed later.
     */
    addEventListener(event, callback) {
        return Tts.addEventListener(event, callback);
    }
}

// Export a singleton instance
const ttsService = new TtsService();
export default ttsService;

/**
 * --- HOW TO USE ---
 * 
 * 1. Import the service:
 * import ttsService from 'path/to/ttsService';
 * 
 * 2. Example usage in a component:
 * 
 * const [isSpeaking, setIsSpeaking] = useState(false);
 *
 * const handleSpeak = (message) => {
 *     const textToSpeak = message;
 *     if (!textToSpeak.trim()) return;
 *     setIsSpeaking(true);
 *     ttsService.startSpeak(textToSpeak);
 *
 *     const finishListener = ttsService.addEventListener('tts-finish', () => {
 *         setIsSpeaking(false);
 *         finishListener.remove();
 *     });
 * };
 *
 * const handleStop = () => {
 *     ttsService.stopSpeak();
 *     setIsSpeaking(false);
 * };
 */

