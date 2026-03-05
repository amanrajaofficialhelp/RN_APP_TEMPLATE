import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../profile/store/profileSlice';
import { getApi } from '../../../shared/services/api';

export const fetchHomeData = createAsyncThunk(
    'home/fetchHomeData',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            await Promise.all([
                dispatch(fetchUserProfile()).unwrap(),
                dispatch(fetchHomeApiData()).unwrap(),
            ]);
            return true;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchHomeApiData = createAsyncThunk(
    'home/fetchHomeApiData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi('home');
            console.log('Home thunk response ---> ', response?.data);
            return response?.data || [];
        } catch (error) {
            console.log('Home thunk error ---> ', error);
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    homeData: [],
    loading: false,
    refreshing: false,
    homeDataLoading: false,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state, action) => {
                const isRefresh = action.meta.arg?.isRefresh;
                if (isRefresh) {
                    state.refreshing = true;
                } else {
                    state.loading = true;
                }
            })
            .addCase(fetchHomeData.fulfilled, (state) => {
                state.loading = false;
                state.refreshing = false;
            })
            .addCase(fetchHomeData.rejected, (state) => {
                state.loading = false;
                state.refreshing = false;
            })

            .addCase(fetchHomeApiData.pending, (state) => {
                state.homeDataLoading = true;
            })
            .addCase(fetchHomeApiData.fulfilled, (state, action) => {
                state.homeDataLoading = false;
                state.homeData = action.payload;
            })
            .addCase(fetchHomeApiData.rejected, (state) => {
                state.homeDataLoading = false;
            });
    },
});

export default homeSlice.reducer;