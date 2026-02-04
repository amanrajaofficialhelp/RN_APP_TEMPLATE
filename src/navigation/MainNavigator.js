import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import ProfileScreen from '../modules/profile/screens/ProfileScreen'
import TabNavigator from './TabNavigator'

const MainNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='BottomTab' screenOptions={{
            headerShown: false,
            animation: 'ios_from_right'
        }}>
            <Stack.Screen name="BottomTab" component={TabNavigator} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})