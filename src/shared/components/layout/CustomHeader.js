import { ChevronRight } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, TYPOGRAPHY } from '../../constant';
import { RF } from '../../utils/responsiveFont';


const CustomHeader = ({ title }) => {
    return (
        <View style={styles.container}>
            <ChevronRight size={RF(20)} color={COLORS.BLACK} />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        padding: RF(10),
    },
    title: {
        color: COLORS.BLACK,
        fontFamily: FONTS.MEDIUM,
        fontSize: TYPOGRAPHY.h4
    }
})