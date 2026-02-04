import { Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { setAuthenticated } from '../../../modules/auth/store/authSlice'
import CustomHeader from '../../../shared/components/layout/CustomHeader'
import MainView from '../../../shared/components/layout/MainView'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    function handleLogout() {
        dispatch(setAuthenticated(false))
    }
    return (
        <MainView topSafe={true}>
            <CustomHeader title="Profile" />
            <Button title="Logout" onPress={handleLogout} />
        </MainView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})