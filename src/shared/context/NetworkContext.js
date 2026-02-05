import NetInfo from '@react-native-community/netinfo'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
// import { useToast } from './ToastContext'

const NetworkContext = createContext(true)

export const NetworkProvider = ({ children }) => {

    const [isOnline, setIsOnline] = useState(true)

    // const { showToast } = useToast()
    const isFirstRender = useRef(true)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const online = Boolean(state.isConnected && state.isInternetReachable)
            setIsOnline(online)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (isOnline) {
            // showToast('success', 'Back Online! Connection restored.')
        } else {
            // showToast('error', 'No Internet Connection. Please check your network.', false)
        }
    }, [isOnline])

    return (
        <NetworkContext.Provider value={isOnline}>
            {children}
        </NetworkContext.Provider>
    )
}

export const useNetwork = () => useContext(NetworkContext)