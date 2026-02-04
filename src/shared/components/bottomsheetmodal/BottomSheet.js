import { BottomSheetFlatList, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomBackdrop from './CustomBackdrop';

const BottomSheet = ({ bottomSheetModalRef, handleSheetChanges }) => {
    const safeAreaInsets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ["50%"], []);
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );

    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Text style={styles.text}>{item}</Text>
            </View>
        ),
        []
    );

    const handleRefresh = useCallback(() => {
        console.log("handleRefresh");
    }, []);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            backdropComponent={CustomBackdrop}
            enableOverDrag={false}
            enablePanDownToClose={true}
            // bottomInset={safeAreaInsets.bottom}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={(i) => i}
                renderItem={renderItem}
                contentContainerStyle={[styles.flatListContent, { paddingBottom: safeAreaInsets.bottom }]}
                refreshing={false}
                onRefresh={handleRefresh}
                ListHeaderComponent={
                    <BottomSheetTextInput
                        placeholder="Enter your name"
                        placeholderTextColor={"#ccc"}
                        style={styles.textInput}
                    />
                }
            />
        </BottomSheetModal>
    )
}

export default BottomSheet

const styles = StyleSheet.create({

    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        color: "black",
        borderWidth: 1,
        borderColor: "#ccc"
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    flatListContent: {
        backgroundColor: "white",
        paddingBottom: 20,
    },
    itemContainer: {
        paddingHorizontal: 12,
    },
    text: {
        fontSize: 16,
        marginVertical: 10
    }
})