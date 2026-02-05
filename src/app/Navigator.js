import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import Config from 'react-native-config'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import AuthNavigator from '../navigation/AuthNavigator'
import MainNavigator from '../navigation/MainNavigator'
import CustomToast from '../shared/components/toast/CustomToast'
import { checkAppUpdate } from '../shared/services/inappupdate/appUpdate'
import { companyData } from '../store/slices/companySlice'

const Navigator = () => {

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)
    const { data } = useSelector(state => state.company)

    console.log('User is authenticated : ', isAuthenticated)
    console.log('Config : ', Config.API_URL)
    console.log('Company data : ', data)

    const loadingState = { company: false }
    const [loading, setLoading] = useState(loadingState)
    function handleLoading(name, value) {
        setLoading({ ...loading, [name]: value })
    }

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    async function fetchData() {
        // if (!isOnline) return
        try {
            handleLoading('company', true)
            const response = await dispatch(companyData()).unwrap()
            const UPDATE_CONDITION = response?.updates?.isForceUpdate ? "FORCED" : "FLEXIBLE"
            if (!__DEV__) {
                handleAppUpdate(UPDATE_CONDITION)
            }
        } catch (error) {
            console.log('Error fetching company data : ', error)
            // showToast("error", error)
        } finally {
            handleLoading('company', false)
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

const styles = StyleSheet.create({})