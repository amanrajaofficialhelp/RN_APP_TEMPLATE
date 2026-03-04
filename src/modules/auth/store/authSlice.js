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
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetAuthState, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;