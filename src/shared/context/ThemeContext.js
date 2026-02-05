import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

import { ASYNC, DARK_THEME, LIGHT_THEME } from '../constant'
import { getItem, setItem } from '../services/storage/asyncStorage'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const systemScheme = useColorScheme() // 'light' | 'dark'
    const [mode, setMode] = useState('light') // 'light' | 'dark' | 'system'

    useEffect(() => {
        (async () => {
            const saved = await getItem({ key: ASYNC.THEME })
            if (saved === 'light' || saved === 'dark' || saved === 'system') {
                setMode(saved)
            }
        })()
    }, [])

    const theme = useMemo(() => {
        const effectiveScheme =
            mode === 'system' ? systemScheme || 'light' : mode

        return effectiveScheme === 'dark' ? DARK_THEME : LIGHT_THEME
    }, [mode, systemScheme])

    const changeMode = async (newMode) => {
        setMode(newMode)
        await setItem({ key: ASYNC.THEME, value: newMode })
    }

    return (
        <ThemeContext.Provider value={{ theme, mode, setMode: changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)