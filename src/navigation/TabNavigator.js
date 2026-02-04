import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import HomeScreen from '../modules/home/screens/HomeScreen'
import ProfileScreen from '../modules/profile/screens/ProfileScreen'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'white',
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})