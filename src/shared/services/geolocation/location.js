import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
import { store } from '../../../store/store'
import { setCurrentLocation, setSelectedAddress } from '../../../store/slices/locationSlice';

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                // console.log('position ---> ', position)
                const { latitude, longitude, accuracy, altitude } = position.coords;
                var NY = {
                    lat: latitude,
                    lng: longitude
                };
                Geocoder.geocodePosition(NY).then(res => {
                    // console.log('res ---> ', res)
                    const { position, ...restAddress } = res?.[0];
                    store.dispatch(setCurrentLocation({ ...restAddress, latitude, longitude, accuracy, altitude }))
                    store.dispatch(setSelectedAddress({ ...restAddress, latitude, longitude, accuracy, altitude }))
                    resolve({ ...restAddress, latitude, longitude, accuracy, altitude })
                })
                    .catch(err => console.log(err))
            },
            (error) => {
                console.log('Error getting current location:', error);
                reject(error)
            }
        );
    });
};

const watchLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.watchPosition(
            (position) => {
                console.log('Watched location:', position);
                resolve(position)
            },
            (error) => {
                console.log('Error watching location:', error);
                reject(error)
            }
        );
    });
};

export {
    getCurrentLocation,
    watchLocation,
};