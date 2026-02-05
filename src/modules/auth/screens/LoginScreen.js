import { Button, StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainView from '../../../shared/components/layout/MainView'
import { SVG } from '../../../shared/constant'

const LoginScreen = ({ navigation }) => {
    const safeAreaInsets = useSafeAreaInsets()
    return (
        <MainView topSafe={true}>
            <View style={{ flex: 1, paddingBottom: safeAreaInsets.bottom }}>
                <Text>LoginScreen</Text>
                <SVG.GoogleIcon width={50} height={50} />
                <Text>{Config.APP_MODE}</Text>
                <Button title="Send OTP" onPress={() => navigation.navigate('Otp')} />
            </View>
        </MainView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})