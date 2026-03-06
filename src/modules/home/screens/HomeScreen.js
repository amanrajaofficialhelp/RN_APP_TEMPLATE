import { useCallback, useEffect, useRef } from 'react'
import { BackHandler, Button, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import BottomModal from '../../../shared/components/bottomsheetmodal/BottomModal'
import BottomSheet from '../../../shared/components/bottomsheetmodal/BottomSheet'
import CustomHeader from '../../../shared/components/layout/CustomHeader'
import MainView from '../../../shared/components/layout/MainView'
import { useNetwork } from '../../../shared/context/NetworkContext'
import { useToast } from '../../../shared/context/ToastContext'
import { getCurrentLocation } from '../../../shared/services/geolocation/location'
import checkAndEnableLocationServices from '../../../shared/services/permissions/gpsPermission'
import locationPermission from '../../../shared/services/permissions/locationPermission'
import notificationPermission from '../../../shared/services/permissions/notificationPermission'
import { requestCameraPermission, requestMicrophonePermission } from '../../../shared/services/permissions/universalPermission'
import { fetchHomeData } from '../store/homeSlice'

const HomeScreen = ({ navigation }) => {

    const safeAreaInsets = useSafeAreaInsets()
    const styles = createStyles(safeAreaInsets)
    const { showToast } = useToast()
    const isOnline = useNetwork()

    const dispatch = useDispatch()
    const { homeData, loading, refreshing, homeDataLoading } = useSelector(state => state.home)
    const { currentLocation } = useSelector(state => state.location)
    // console.log('User current location ---> ', currentLocation)

    async function fetchData() {
        if (!isOnline) {
            showToast('error', 'No internet available')
            return
        }
        try {
            const response = await dispatch(fetchHomeData()).unwrap();
            console.log('Home screen response ---> ', response)
        } catch (error) {
            console.log('Home screen error --->', error)
            // showToast('error', error)
        }
    }

    const handlePermissions = useCallback(async () => {
        await notificationPermission();
        await locationPermission(true);
        await checkAndEnableLocationServices();
        await getCurrentLocation();
        await requestCameraPermission();
        await requestMicrophonePermission();
    }, []);

    useEffect(() => {
        handlePermissions()
        fetchData()
    }, [isOnline])

    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalRef2 = useRef(null);

    const sheetIndexRef = useRef(-1);
    const modalIndexRef = useRef(-1);

    useEffect(() => {
        const backAction = () => {
            if (sheetIndexRef.current >= 0) {
                bottomSheetModalRef.current?.dismiss();
                return true;
            }
            if (modalIndexRef.current >= 0) {
                bottomSheetModalRef2.current?.dismiss();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        sheetIndexRef.current = index;
        console.log('handleSheetChanges', index);
    }, []);

    const handlePresentModalPress2 = useCallback(() => {
        bottomSheetModalRef2.current?.present();
    }, []);
    const handleSheetChanges2 = useCallback((index) => {
        modalIndexRef.current = index;
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <MainView>
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

const createStyles = (safeAreaInsets) => StyleSheet.create({
    container: {
        flex: 1
    },

    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
        padding: 14, fontSize: 16, minHeight: 100,
        textAlignVertical: 'top', marginBottom: 20,
    },
    button: {
        backgroundColor: '#4F46E5', padding: 16,
        borderRadius: 12, alignItems: 'center',
    },
    buttonActive: { backgroundColor: '#DC2626' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
})