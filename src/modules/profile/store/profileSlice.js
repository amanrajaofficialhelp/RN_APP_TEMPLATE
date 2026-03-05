import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi, putMediaApi } from '../../../shared/services/api';

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi(`users/profile`);
            console.log('Profile thunk response ---> ', response?.data);
            return response?.data?.data;
        } catch (error) {
            console.log('Profile thunk error ---> ', error);
            return rejectWithValue(error);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (data, { rejectWithValue }) => {
        try {
            const response = await putMediaApi(`users/update`, data);
            console.log('Profile update thunk response ---> ', response?.data);
            return response?.data;
        } catch (error) {
            console.log('Profile update thunk error ---> ', error);
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    user: null,
    loading: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload;
        },
        clearProfile: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.user = action.payload.data;
                }
            })
            .addCase(updateUserProfile.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { clearProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;