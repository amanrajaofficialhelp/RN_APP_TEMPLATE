import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomBackdrop from './CustomBackdrop';

const BottomModal = ({ bottomSheetModalRef, handleSheetChanges }) => {
    const safeAreaInsets = useSafeAreaInsets();
    const backdropComponent = useCallback((props) => (
        <CustomBackdrop {...props} pressBehavior="close" />
    ), [])
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            backdropComponent={backdropComponent}
            enableOverDrag={false}
            enablePanDownToClose={false}
            bottomInset={safeAreaInsets.bottom}
            detached={true}
            containerStyle={styles.containerStyle}
            backgroundStyle={styles.backgroundStyle}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
                <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default BottomModal

const styles = StyleSheet.create({
    containerStyle: {
        marginHorizontal: 15
    },
    backgroundStyle: {
        backgroundColor: "#fff"
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
    },
})