import { Button, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainView from '../../../shared/components/layout/MainView'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../store/authSlice'

const OtpScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const safeAreaInsets = useSafeAreaInsets()
    async function handleVerifyOtp() {
        dispatch(setAuthenticated(true))
    }

    return (
        <MainView topSafe={true}>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: safeAreaInsets.bottom }}>
                <Text>OtpScreen</Text>
                <Button title="Verify OTP" onPress={handleVerifyOtp} />
            </View>
        </MainView>
    )
}

export default OtpScreen

const styles = StyleSheet.create({})