import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import RNBootSplash from 'react-native-bootsplash'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import AuthNavigator from '../navigation/AuthNavigator'
import MainNavigator from '../navigation/MainNavigator'
import CustomToast from '../shared/components/toast/CustomToast'
// import { checkAppUpdate } from '../shared/services/inappupdate/appUpdate'
import { companyThunkApi } from '../store/slices/companySlice'
import { useNetwork } from '../shared/context/NetworkContext'

const Navigator = () => {

    const isOnline = useNetwork()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    async function fetchData() {
        if (!isOnline) return
        try {
            const response = await dispatch(companyThunkApi()).unwrap()
            console.log('Navigator company response --->', response)
            const UPDATE_CONDITION = response?.updates?.isForceUpdate ? "FORCED" : "FLEXIBLE"
            if (!__DEV__) {
                // handleAppUpdate(UPDATE_CONDITION)
            }
        } catch (error) {
            console.log('Navigator company error --->', error)
            // showToast("error", error)
        }
    }

    async function handleAppUpdate(UPDATE_CONDITION) {
        const result = await checkAppUpdate(UPDATE_CONDITION)
        if (result?.shouldUpdate && result?.type === 'FORCED') {
            setShowUpdateModal(true)
        }
    }

    useEffect(() => {
        fetchData()
        RNBootSplash.hide();
    }, []);

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <NavigationContainer>
                    <CustomToast />
                    {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default Navigator