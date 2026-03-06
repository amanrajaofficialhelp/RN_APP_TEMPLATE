import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const locationThunkApi = createAsyncThunk(
    'location/locationThunkApi',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi(`location`)
            const data = response?.data?.data
            // console.log('Location slice response ---> ', response?.data)
            return data
        } catch (error) {
            // console.log('Location slice error ---> ', error)
            return rejectWithValue(error)
        }
    }
)

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        currentLocation: null,
        selectedAddress: null,
        addressList: [],
        loading: {
            loading: false,
            refreshing: false
        }
    },
    reducers: {
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        },
        setSelectedAddress(state, action) {
            state.selectedAddress = action.payload
        },
        resetLocationState(state) {
            state.currentLocation = null
            state.selectedAddress = null
            state.addressList = []
            state.loading = {
                loading: false,
                refreshing: false
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(locationThunkApi.pending, (state) => {
                state.loading.loading = true
            })
            .addCase(locationThunkApi.fulfilled, (state, { payload }) => {
                state.loading.loading = false
                state.data = payload
            })
            .addCase(locationThunkApi.rejected, (state, { payload }) => {
                state.loading.loading = false
            })
})

export const { setCurrentLocation, setSelectedAddress, resetLocationState } = locationSlice.actions
export default locationSlice.reducer