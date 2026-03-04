import { Button, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import MainView from '../../../shared/components/layout/MainView'
import { COLORS } from '../../../shared/constant'
import { useNetwork } from '../../../shared/context/NetworkContext'
import { useToast } from '../../../shared/context/ToastContext'
import { loginUser } from '../store/authSlice'

const LoginScreen = ({ navigation }) => {

    const safeAreaInsets = useSafeAreaInsets()
    const styles = createStyles(safeAreaInsets)
    const { showToast } = useToast()
    const isOnline = useNetwork()

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth)

    async function sendOtpApi() {
        if (!isOnline) {
            showToast('error', 'No internet available')
            return
        }
        const data = {
            mobile: '1234567890',
        }
        try {
            const response = await dispatch(loginUser(data)).unwrap();
            console.log('Login screen response ---> ', response)
            navigation.navigate('Otp')
        } catch (error) {
            console.log('Login screen error --->', error)
            showToast('error', error)
            navigation.navigate('Otp')
        }
    }

    return (
        <MainView>
            <View style={styles.container}>

                <Text>Login</Text>

                <Button title="Send OTP" onPress={sendOtpApi} />
            </View>
        </MainView>
    )
}

export default LoginScreen

const createStyles = (safeAreaInsets) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: safeAreaInsets.top + 20,
        paddingBottom: safeAreaInsets.bottom + 20,
        backgroundColor: COLORS.WHITE
    },
    skeletonWrapper: {
        width: '100%',
        flex: 1,
        marginTop: 10,
    },
    row: {
        width: '100%',
        paddingVertical: 6,
    },
    normalText: {
        fontSize: 16,
        color: 'black',
    },
    bigText: {
        fontSize: 24,
        color: 'black',
    },
})