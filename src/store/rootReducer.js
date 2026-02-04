import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/store/authSlice';
import companyReducer from './slices/companySlice';

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
});

export default rootReducer;
