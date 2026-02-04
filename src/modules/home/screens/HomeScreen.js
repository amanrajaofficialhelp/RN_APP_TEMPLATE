import { Button, StyleSheet, Text, View } from 'react-native'
import MainView from '../../../shared/components/layout/MainView'
import CustomHeader from '../../../shared/components/layout/CustomHeader'
import { useRef, useCallback } from 'react'
import BottomSheet from '../../../shared/components/bottomsheetmodal/BottomSheet'
import BottomModal from '../../../shared/components/bottomsheetmodal/BottomModal'

const HomeScreen = ({ navigation }) => {
    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalRef2 = useRef(null);


    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handlePresentModalPress2 = useCallback(() => {
        bottomSheetModalRef2.current?.present();
    }, []);
    const handleSheetChanges2 = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <MainView topSafe={true}>
            <CustomHeader title="Home" />

            <Button
                title="Open Bottom Sheet"
                onPress={handlePresentModalPress}
            />
            <Button
                title="Open Bottom Modal"
                onPress={handlePresentModalPress2}
            />

            <Button
                title="Profile screen"
                onPress={() => {
                    navigation.navigate('Profile')
                }}
            />

            <BottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                handleSheetChanges={handleSheetChanges}
            />
            <BottomModal
                bottomSheetModalRef={bottomSheetModalRef2}
                handleSheetChanges={handleSheetChanges2}
            />
        </MainView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})