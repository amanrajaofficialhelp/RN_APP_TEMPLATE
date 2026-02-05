// import { Ionicons } from '@react-native-vector-icons/ionicons'
import { ChevronRight } from 'lucide-react-native';
import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { COLORS, FONTS, RF, SIZES } from '../../constant'
import { useToast } from '../../context/ToastContext'

const CustomToast = () => {

    const { toast, hideToast } = useToast()
    const insets = useSafeAreaInsets()
    const translateY = useRef(new Animated.Value(-100)).current

    useEffect(() => {
        if (toast.visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 40,
                friction: 7,
            }).start()
        } else {
            Animated.timing(translateY, {
                toValue: -200, // Move further off-screen
                duration: 300,
                useNativeDriver: true,
            }).start()
        }
    }, [toast.visible])

    const getToastStyle = () => {
        switch (toast.type) {
            case 'success':
                return {
                    backgroundColor: COLORS.GREEN || '#4CAF50',
                    // icon: 'checkmark-circle'
                }
            case 'error':
                return {
                    backgroundColor: COLORS.RED || '#F44336',
                    // icon: 'alert-circle'
                }
            case 'info':
                return {
                    backgroundColor: COLORS.BLUE || '#2196F3',
                    // icon: 'information-circle'
                }
            default:
                return {
                    backgroundColor: COLORS.GREEN || '#4CAF50',
                    // icon: 'checkmark-circle'
                }
        }
    }

    const config = getToastStyle()

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    paddingTop: insets.top + (SIZES.SPACING / 2),
                    backgroundColor: config.backgroundColor,
                }
            ]}
        >
            <View style={styles.content}>
                {/* <Ionicons name={config.icon} size={RF(24)} color="#FFFFFF" /> */}
                <Text style={styles.message}>{toast.message}</Text>
                <Pressable onPress={hideToast} style={styles.closeButton}>
                    {/* <Ionicons name="close" size={RF(20)} color="#FFFFFF" /> */}
                </Pressable>
            </View>
        </Animated.View>
    )
}

export default CustomToast

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingBottom: SIZES.SPACING,
        paddingHorizontal: SIZES.SPACING,
        zIndex: 9999,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    message: {
        flex: 1,
        color: '#FFFFFF',
        fontFamily: FONTS.MEDIUM,
        fontSize: RF(14),
        marginLeft: 12,
    },
    closeButton: {
        padding: 5,
    },
})