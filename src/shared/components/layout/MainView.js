import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainView = ({ children, topSafe = false, bottomSafe = false, rightSafe = true, leftSafe = true, content = 'dark', backgroundColor = 'white' }) => {
    const safeAreaInsets = useSafeAreaInsets();

    const paddingTop = topSafe ? safeAreaInsets.top : 0;
    const paddingBottom = bottomSafe ? safeAreaInsets.bottom : 0;
    const paddingRight = rightSafe ? safeAreaInsets.right : 0;
    const paddingLeft = leftSafe ? safeAreaInsets.left : 0;

    return (
        <View style={[styles.container, { paddingTop, paddingBottom, paddingRight, paddingLeft, backgroundColor }]}>
            <StatusBar barStyle={`${content}-content`} />
            {children}
        </View>
    )
}

export default MainView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})