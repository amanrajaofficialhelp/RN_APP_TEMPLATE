import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../../shared/services/api';
import { setSecureItem } from '../../../shared/services/storage/keychain';

export const loginUserThunkApi = createAsyncThunk(
    'auth/loginUserThunkApi',
    async (data, { rejectWithValue }) => {
        try {
            const response = await postApi('auth/login', data);
            console.log('Login user slice response ---> ', response.data)
            return response?.data;
        } catch (error) {
            console.log('Login user slice error --->', error)
            return rejectWithValue(error);
        }
    }
);

export const verifyOtpThunkApi = createAsyncThunk(
    'auth/verifyOtpThunkApi',
    async (data, { rejectWithValue }) => {
        try {
            const response = await postApi('auth/verifyOtpThunkApi', data);
            console.log('Verify OTP slice response ---> ', response.data)
            const { token, user } = response?.data?.data || {};
            if (!token && !user) throw 'Invalid authentication response';
            await setSecureItem({ service: 'ACCESS_TOKEN', username: user?._id, value: token });
            return { token, user };
        } catch (error) {
            console.log('Verify OTP slice error --->', error)
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        loading: false,
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        resetAuthState: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUserThunkApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUserThunkApi.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(loginUserThunkApi.rejected, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtpThunkApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtpThunkApi.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(verifyOtpThunkApi.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetAuthState, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;