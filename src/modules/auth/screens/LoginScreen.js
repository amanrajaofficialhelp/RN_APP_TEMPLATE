import { Button, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainView from '../../../shared/components/layout/MainView'

const LoginScreen = ({ navigation }) => {
    const safeAreaInsets = useSafeAreaInsets()
    const styles = createStyles(safeAreaInsets)

    async function sendOtpApi() {
        navigation.navigate('Otp')
    }

    return (
        <MainView topSafe={true}>
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
        paddingBottom: safeAreaInsets.bottom,
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
