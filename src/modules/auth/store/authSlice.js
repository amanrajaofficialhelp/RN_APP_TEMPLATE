import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../../shared/services/api';
import { setSecureItem } from '../../../shared/services/storage/keychain';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await postApi('auth/login', data);
            console.log('Login user thunk response ---> ', response.data)
            return response?.data;
        } catch (error) {
            console.log('Login user thunk error --->', error)
            return rejectWithValue(error);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (data, { rejectWithValue }) => {
        try {
            const response = await postApi('auth/verifyOtp', data);
            console.log('Verify OTP thunk response ---> ', response.data)
            const { token, user } = response?.data?.data || {};
            if (!token && !user) throw 'Invalid authentication response';
            await setSecureItem({ service: 'ACCESS_TOKEN', username: user?._id, value: token });
            return { token, user };
        } catch (error) {
            console.log('Verify OTP thunk error --->', error)
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    otpSent: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.otpSent = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { logout, resetAuthState, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;

