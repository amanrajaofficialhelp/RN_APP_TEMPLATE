import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApi } from '../../shared/services/api'

const initialState = {
    data: null,
    status: 'idle',
    error: null,
}

export const companyData = createAsyncThunk(
    'company/companyData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApi(`company`)
            const data = response?.data?.data
            // console.log('Company slice response ---> ', response?.data)
            if (!data || Array.isArray(data) || typeof data !== 'object') {
                return rejectWithValue('Invalid company data format')
            }
            return data
        } catch (error) {
            // console.log('Company slice error ---> ', error)
            return rejectWithValue(error)
        }
    }
)

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany(state, action) {
            state.data = action.payload
        },
        updateCompany(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            }
        },
        resetCompany(state) {
            state.data = null
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(companyData.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(companyData.fulfilled, (state, { payload }) => {
                state.status = 'succeeded'
                state.data = payload
            })
            .addCase(companyData.rejected, (state, { payload }) => {
                state.status = 'failed'
                state.error = payload
            })
})

export const { setCompany, updateCompany, resetCompany } = companySlice.actions
export default companySlice.reducer