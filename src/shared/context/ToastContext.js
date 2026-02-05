import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {

    const timerRef = useRef(null)
    const [toast, setToast] = useState({
        visible: false,
        type: 'success', // 'success' | 'error' | 'info'
        message: '',
    })

    const showToast = useCallback((type, message, autoHide = true) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setToast({ visible: true, type, message })

        if (autoHide) {
            timerRef.current = setTimeout(() => {
                setToast(prev => ({ ...prev, visible: false }))
            }, 3000)
        }
    }, [])

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, visible: false }))
    }, [])

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toast }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}