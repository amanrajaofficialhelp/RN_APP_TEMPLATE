import { Button, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainView from '../../../shared/components/layout/MainView'
import Config from 'react-native-config'

const LoginScreen = ({ navigation }) => {
    const safeAreaInsets = useSafeAreaInsets()
    return (
        <MainView topSafe={true}>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: safeAreaInsets.bottom }}>
                <Text>LoginScreen</Text>
                <Text>{Config.API_URL}</Text>
                <Button title="Send OTP" onPress={() => navigation.navigate('Otp')} />
            </View>
        </MainView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})