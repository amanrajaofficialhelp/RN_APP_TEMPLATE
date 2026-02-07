import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeScreen from '../modules/home/screens/HomeScreen'
import { COLORS, FONTS, RF } from '../shared/constant'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    const insets = useSafeAreaInsets()
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.BACKGROUND,
                borderTopWidth: 0,
                height: Platform.OS === 'ios' ? RF(60) + insets.bottom : RF(60) + insets.bottom,
                paddingTop: RF(5),
            },
            tabBarActiveTintColor: COLORS.PRIMARY,
            tabBarInactiveTintColor: COLORS.WHITE,
            tabBarLabelStyle: {
                fontSize: RF(9.5),
                fontFamily: FONTS.REGULAR,
            },
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={RF(24)} />,
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})