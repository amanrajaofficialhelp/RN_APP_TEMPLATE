import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import LoginScreen from '../modules/auth/screens/LoginScreen'
import OtpScreen from '../modules/auth/screens/OtpScreen'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false,
            animation: 'ios_from_right'
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})