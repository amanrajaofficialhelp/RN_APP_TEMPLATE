import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import Config from 'react-native-config'

import { getSecureItem } from './storage/keychain'
import store from '../../store/store'

const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 2 * 1000,
    headers: {
        "Content-Type": 'application/json'
    }
})


api.interceptors.request.use(
    async config => {
        const state = await NetInfo.fetch()
        const isOnline = state.isConnected && state.isInternetReachable
        if (!isOnline) throw { message: 'No internet available' }


        const secureData = await getSecureItem({ service: 'ACCESS_TOKEN' })
        console.log('SECURE DATA : ', secureData)
        if (secureData?.value) {
            config.headers.Authorization = `Bearer ${secureData.value}`
        }
        config.metadata = { startTime: new Date() }
        return config
    },
    error => {
        return Promise.reject(error)
    }

)

api.interceptors.response.use(
    response => {
        const endTime = new Date()
        const duration = endTime - response.config.metadata.startTime
        response.responseTime = `${duration} ms`
        if (response?.data?.cache) {
            // store.dispatch(setCacheData(response.data.cache))
        }
        console.log('API INTERCEPTORS RESPONSE : ', response)
        return response
    },
    error => {
        console.log('API INTERCEPTORS ERROR : ', error)
        let errorMessage

        const state = store.getState()
        const cacheData = state.auth.cacheData

        if (cacheData?.maintenanceStatus) return Promise.reject('Server under maintenance')

        // if (error?.response?.data === ERRORS.notfound && error.status === 404) {
        //     store.dispatch(setCacheData({ maintenanceStatus: true }))
        //     return Promise.reject('Server under maintenance')
        // }
        if (error.status === 404) {
            errorMessage = 'Requested resource not found'
        } else {
            errorMessage = error?.response?.data?.message || error?.response?.data?.error || error?.request?._response || error?.message || 'Something went wrong.'
        }
        return Promise.reject(errorMessage)
    }
)

export const getApi = async (endpoint, params) => {
    try {
        return await api.get(endpoint, params)
    } catch (error) {
        throw error
    }
}


export const postApi = async (endpoint, data) => {
    try {
        return await api.post(endpoint, data)
    } catch (error) {
        throw error
    }
}

export const putApi = async (endpoint, data) => {
    try {
        return await api.put(endpoint, data)
    } catch (error) {
        throw error
    }
}

export const deleteApi = async (endpoint) => {
    try {
        return await api.delete(endpoint)
    } catch (error) {
        throw error
    }
}