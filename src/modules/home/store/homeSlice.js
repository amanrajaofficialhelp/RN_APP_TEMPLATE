import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { profileThunkApi } from '../../profile/store/profileSlice';
import { getApi } from '../../../shared/services/api';

export const fetchHomeData = createAsyncThunk(
    'home/fetchHomeData',
    async (params, { dispatch, rejectWithValue }) => {
        try {
            await Promise.all([
                dispatch(profileThunkApi()).unwrap(),
                dispatch(homeThunkApi()).unwrap(),
            ]);
            return true;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const homeThunkApi = createAsyncThunk(
    'home/homeThunkApi',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi('home-endpoint');
            const data = response?.data?.data
            console.log('Home slice response ---> ', response?.data);
            return data;
        } catch (error) {
            console.log('Home slice error ---> ', error);
            return rejectWithValue(error);
        }
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeData: [],
        loading: false,
        refreshing: false,
        homeDataLoading: false,
    },
    reducers: {
        resetHomeState: (state) => {
            state.homeData = [];
            state.loading = false;
            state.refreshing = false;
            state.homeDataLoading = false;
        },
    },
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

            .addCase(homeThunkApi.pending, (state) => {
                state.homeDataLoading = true;
            })
            .addCase(homeThunkApi.fulfilled, (state, action) => {
                state.homeDataLoading = false;
                state.homeData = action.payload;
            })
            .addCase(homeThunkApi.rejected, (state) => {
                state.homeDataLoading = false;
            });
    },
});

export const { resetHomeState } = homeSlice.actions;
export default homeSlice.reducer;