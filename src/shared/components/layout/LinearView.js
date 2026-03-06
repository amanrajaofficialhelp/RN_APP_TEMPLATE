import { StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constant';

const LinearView = ({
    children,
    topSafe = false,
    bottomSafe = false,
    rightSafe = false,
    leftSafe = false,
    content = 'light',
    backgroundColor = [COLORS.GRADIENT_START, COLORS.GRADIENT_END]
}) => {

    const safeAreaInsets = useSafeAreaInsets();

    const paddingTop = topSafe ? safeAreaInsets.top : 0;
    const paddingBottom = bottomSafe ? safeAreaInsets.bottom : 0;
    const paddingRight = rightSafe ? safeAreaInsets.right : 0;
    const paddingLeft = leftSafe ? safeAreaInsets.left : 0;

    return (
        <LinearGradient
            colors={backgroundColor}
            style={[styles.container, { paddingTop, paddingBottom, paddingRight, paddingLeft }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <StatusBar barStyle={`${content}-content`} />
            {children}
        </LinearGradient>
    )
}

export default LinearView

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})