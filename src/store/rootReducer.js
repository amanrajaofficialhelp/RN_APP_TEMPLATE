import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/store/authSlice';
import companyReducer from './slices/companySlice';
import profileReducer from '../modules/profile/store/profileSlice'
import homeReducer from '../modules/home/store/homeSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    profile: profileReducer,
    home: homeReducer,
});

export default rootReducer;