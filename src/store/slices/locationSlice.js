import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentLocation: null,
    selectedAddress: null,
    addressList: [
        {
            id: '1',
            type: 'Home',
            formattedAddress: '123, Green Valley, Sector 45, Gurgaon, Haryana 122003',
            phone: '9876543210'
        },
        {
            id: '2',
            type: 'Office',
            formattedAddress: 'Tech Park Towers, Floor 12, Whitefield, Bangalore, Karnataka 560066',
            phone: '9876543211'
        },
        {
            id: '3',
            type: 'Other',
            formattedAddress: '45/B, Rosewood Apartments, Koregaon Park, Pune, Maharashtra 411001',
            phone: '9876543212'
        },
        {
            id: '4',
            type: 'Home',
            formattedAddress: 'A-22, Sky High residency, Salt Lake City, Sector V, Kolkata 700091',
            phone: '9876543213'
        },
        {
            id: '5',
            type: 'Gym',
            formattedAddress: 'Iron Paradise Fitness, Mall Road, Civil Lines, Ludhiana, Punjab 141001',
            phone: '9876543214'
        }
    ],
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
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
        },
    },
})

export const { setCurrentLocation, setSelectedAddress, resetLocationState } = locationSlice.actions
export default locationSlice.reducer