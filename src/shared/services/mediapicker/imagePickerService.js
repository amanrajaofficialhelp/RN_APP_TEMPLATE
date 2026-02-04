/**
 * Image Picker Service
 * =====================================================
 * WHY THIS FILE EXISTS:
 * ---------------------
 * This service centralizes all image selection logic
 * (gallery & camera) using `react-native-image-crop-picker`.
 *
 * Instead of calling the library directly in screens,
 * we use this service to:
 * - Keep UI components clean
 * - Handle permissions in one place
 * - Normalize image response format
 * - Easily update picker behavior globally
 *
 * HOW TO USE:
 * -----------
 * import ImagePickerService from '@/services/imagePickerService'
 *
 * ImagePickerService.pickImageFromGallery()
 * ImagePickerService.captureImageFromCamera()
 *
 *
 * PUBLIC FUNCTIONS:
 * -----------------
 * 1. pickImageFromGallery()
 *    → Opens gallery with crop UI and returns selected image
 *
 * 2. captureImageFromCamera()
 *    → Requests camera permission, opens camera, returns captured image
 */

import { Alert, PermissionsAndroid, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS } from '../../constants';

/**
 * Open device gallery and allow user to select & crop an image.
 *
 * HOW IT WORKS:
 * -------------
 * - Opens system gallery
 * - Enables cropping with free-style resize
 * - Applies compression for optimized upload
 * - Returns a normalized file object:
 *   { name, type, uri }
 *
 * RETURN VALUE:
 * -------------
 * - Success → { name, type, uri }
 * - Cancel / Error → null
 */
async function pickImageFromGallery() {
    try {
        const image = await ImagePicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 1,
            cropperToolbarTitle: 'Resize photo',
            cropperActiveWidgetColor: COLORS.primary,
            cropperStatusBarColor: COLORS.black,
        });

        return {
            name: image.filename || `image_${Date.now()}.jpg`,
            type: image.mime,
            uri: image.path,
        };
    } catch (error) {
        console.log('❌ Gallery image picker error:', error);
        return null;
    }
}

/**
 * Open device camera, capture photo, and return cropped image.
 *
 * HOW IT WORKS:
 * -------------
 * - Requests CAMERA permission (Android only)
 * - If permission denied → shows alert and stops
 * - Opens camera with cropping enabled
 * - Compresses image for upload
 * - Returns a normalized file object:
 *   { name, type, uri }
 *
 * RETURN VALUE:
 * -------------
 * - Success → { name, type, uri }
 * - Permission denied / Cancel / Error → null
 */
async function captureImageFromCamera() {
    try {
        // Android camera permission handling
        if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );

            if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert(
                    'Permission Required',
                    'Camera access is required to take photos.'
                );
                return null;
            }
        }

        const image = await ImagePicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.9,
            includeBase64: false,
            mediaType: 'photo',
            useFrontCamera: false,
            cameraType: 'back',
        });

        return {
            name: image.filename || `camera_${Date.now()}.jpg`,
            type: image.mime,
            uri: image.path,
        };
    } catch (error) {
        console.log('❌ Camera capture error:', error);
        return null;
    }
}

/**
 * SINGLE EXPORT OBJECT
 * =====================================================
 * Only these functions are accessible outside this file.
 * No helpers, no internal state leakage.
 */
const ImagePickerService = {
    pickImageFromGallery,
    captureImageFromCamera,
};

export default ImagePickerService;