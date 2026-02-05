import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { NetworkProvider } from '../shared/context/NetworkContext'
import { ThemeProvider } from '../shared/context/ThemeContext'
import { ToastProvider } from '../shared/context/ToastContext'
import store, { persistor } from '../store/store'
import Navigator from './Navigator'

const App = () => {

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ThemeProvider>
                        <NetworkProvider>
                            <ToastProvider>
                                <Navigator />
                            </ToastProvider>
                        </NetworkProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    )
}

export default App

const styles = StyleSheet.create({})