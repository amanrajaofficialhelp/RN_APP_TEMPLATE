import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, TYPOGRAPHY } from '../../constant';
import { RF } from '../../utils/responsiveFont';

const CustomHeader = ({ title }) => {
    const navigation = useNavigation()
    const noBackButton = [
        'Home'
    ]
    return (
        <View style={styles.container}>
            {noBackButton.includes(title) ? null : (
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={RF(25)} color={COLORS.BLACK} />
                </Pressable>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: RF(10),
        paddingVertical: RF(8),
        backgroundColor: COLORS.WHITE,
    },
    backButton: {
        width: RF(36),
        height: RF(36),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RF(18)
    },
    title: {
        color: COLORS.BLACK,
        fontFamily: FONTS.MEDIUM,
        fontSize: TYPOGRAPHY.h4,
        marginLeft: RF(8)
    }
})