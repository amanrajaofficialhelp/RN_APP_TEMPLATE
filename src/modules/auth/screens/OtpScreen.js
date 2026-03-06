import { Button, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MainView from '../../../shared/components/layout/MainView'
import { useNetwork } from '../../../shared/context/NetworkContext'
import { useToast } from '../../../shared/context/ToastContext'
import { setAuthenticated, verifyOtpThunkApi } from '../store/authSlice'

const OtpScreen = ({ navigation }) => {

    const safeAreaInsets = useSafeAreaInsets()
    const styles = createStyles(safeAreaInsets)
    const { showToast } = useToast()
    const isOnline = useNetwork()

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth)

    async function verifyOtpApi() {
        if (!isOnline) {
            showToast('error', 'No internet available')
            return
        }
        const data = {
            mobile: '1234567890',
            otp: '1234'
        }
        try {
            const response = await dispatch(verifyOtpThunkApi(data)).unwrap();
            console.log('Otp screen response ---> ', response)
        } catch (error) {
            console.log('Otp screen error --->', error)
            // showToast('error', error)
            dispatch(setAuthenticated(true))
        }
    }

    return (
        <MainView>
            <View style={styles.container}>

                <Text>OTP</Text>

                <Button title="Verify OTP" onPress={verifyOtpApi} />
            </View>
        </MainView>
    )
}

export default OtpScreen

const createStyles = (safeAreaInsets) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
        // backgroundColor: COLORS.WHITE,
        justifyContent: 'space-between',
    },
})