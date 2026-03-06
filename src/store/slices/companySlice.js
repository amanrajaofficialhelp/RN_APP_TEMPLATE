import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApi } from '../../shared/services/api'

export const companyThunkApi = createAsyncThunk(
    'company/companyThunkApi',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi(`company-endpoint`)
            const data = response?.data?.data
            console.log('Company slice response ---> ', response?.data)
            if (!data || Array.isArray(data) || typeof data !== 'object') {
                return rejectWithValue('Invalid company data format')
            }
            return data
        } catch (error) {
            console.log('Company slice error ---> ', error)
            return rejectWithValue(error)
        }
    }
)

const companySlice = createSlice({
    name: 'company',
    initialState: {
        data: null,
        loading: {
            loading: false,
            refreshing: false
        }
    },
    reducers: {
        setCompany(state, action) {
            state.data = action.payload
        },
        resetCompanySatate(state) {
            state.data = null
            state.loading = {
                loading: false,
                refreshing: false
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(companyThunkApi.pending, (state) => {
                state.loading.loading = true
            })
            .addCase(companyThunkApi.fulfilled, (state, { payload }) => {
                state.loading.loading = false
                state.data = payload
            })
            .addCase(companyThunkApi.rejected, (state, { payload }) => {
                state.loading.loading = false
            })
})

export const { setCompany, resetCompanySatate } = companySlice.actions
export default companySlice.reducer