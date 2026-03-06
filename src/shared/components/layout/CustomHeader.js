import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, TYPOGRAPHY } from '../../constant';
import { RF } from '../../utils/responsiveFont';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader = ({ title, color = COLORS.BLACK }) => {
    const navigation = useNavigation()
    const safeAreaInsets = useSafeAreaInsets()
    const styles = createStyles(safeAreaInsets)

    const noBackButton = [
        'Home'
    ]
    return (
        <View style={styles.container}>
            {noBackButton.includes(title) ? null : (
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={RF(25)} color={color} />
                </Pressable>
            )}
            <Text style={[styles.title, { color }]}>{title}</Text>
        </View>
    )
}

export default CustomHeader

const createStyles = (safeAreaInsets) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: RF(10),
        paddingVertical: RF(8),
        paddingTop: safeAreaInsets.top,
    },
    backButton: {
        width: RF(36),
        height: RF(36),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RF(18)
    },
    title: {
        fontFamily: FONTS.MEDIUM,
        fontSize: TYPOGRAPHY.h4,
        marginLeft: RF(8)
    }
})