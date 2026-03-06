import { Button, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthenticated } from '../../../modules/auth/store/authSlice'
import CustomHeader from '../../../shared/components/layout/CustomHeader'
import MainView from '../../../shared/components/layout/MainView'
import LinearView from '../../../shared/components/layout/LinearView'
import { useNetwork } from '../../../shared/context/NetworkContext'
import { useToast } from '../../../shared/context/ToastContext'
import { COLORS } from '../../../shared/constant'

const ProfileScreen = ({ navigation }) => {

    const safeAreaInsets = useSafeAreaInsets()
    const styles = createStyles(safeAreaInsets)
    const { showToast } = useToast()
    const isOnline = useNetwork()

    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.profile)

    function handleLogout() {
        dispatch(setAuthenticated(false))
    }

    return (
        <LinearView>
            <CustomHeader title="Profile" color={COLORS.WHITE} />
            <Button title="Logout" onPress={handleLogout} />
        </LinearView>
    )
}

export default ProfileScreen

const createStyles = (safeAreaInsets) => StyleSheet.create({
    container: {
        flex: 1
    }
})