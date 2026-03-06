import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApi, putMediaApi } from '../../../shared/services/api';

export const profileThunkApi = createAsyncThunk(
    'profile/profileThunkApi',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi(`users/profile`);
            const data = response?.data?.data
            console.log('Profile slice response ---> ', response?.data);
            return data;
        } catch (error) {
            console.log('Profile slice error ---> ', error);
            return rejectWithValue(error);
        }
    }
);

export const profileUpdateThunkApi = createAsyncThunk(
    'profile/profileUpdateThunkApi',
    async (data, { rejectWithValue }) => {
        try {
            const response = await putMediaApi(`users/update`, data);
            const data = response?.data?.data
            console.log('Profile update slice response ---> ', response?.data);
            return data;
        } catch (error) {
            console.log('Profile update slice error ---> ', error);
            return rejectWithValue(error);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: null,
        loading: false,
    },
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload;
        },
        resetProfileState: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profileThunkApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(profileThunkApi.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(profileThunkApi.rejected, (state) => {
                state.loading = false;
            })
            .addCase(profileUpdateThunkApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(profileUpdateThunkApi.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(profileUpdateThunkApi.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetProfileState, setProfile } = profileSlice.actions;
export default profileSlice.reducer;