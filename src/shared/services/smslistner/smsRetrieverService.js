import useSMSRetriever from '@ebrimasamba/react-native-sms-retriever';

/**
 * Custom service hook for SMS Retriever
 * Handles loading, success, error & lifecycle
 */
export const useSMSRetrieverService = (options = {}) => {
    const { onSuccess, onError } = options;

    const {
        appHash,
        smsCode,
        isLoading,
        isListening,
        error,
        status,
        startListening,
        stopListening,
        reset,
        isReady,
        hasError,
    } = useSMSRetriever({
        onSuccess: (otp) => {
            onSuccess && onSuccess(otp);
        },
        onError: (err) => {
            console.log('SMS Retriever Error:', err);
            onError && onError(err);
        },
    });

    return {
        // data
        appHash,
        otp: smsCode || '',
        status,
        error,

        // state flags
        isLoading,
        isListening,
        isReady,
        hasError,

        // actions
        start: async () => {
            console.log('Attempting to start SMS listener, isReady:', isReady);
            if (!isReady) {
                console.log('SMS Retriever is not ready yet.');
                return;
            }
            try {
                console.log('Starting SMS listener...');
                await startListening();
                console.log('SMS listener started successfully');
            } catch (e) {
                console.log('Start listening failed:', e);
                // If it's a timeout, we might want to let the component decide to restart
            }
        },

        stop: () => {
            console.log('Stopping SMS listener...');
            stopListening();
        },

        reset: () => {
            console.log('Resetting SMS Retriever...');
            reset();
        },
    };
};

export default useSMSRetrieverService;