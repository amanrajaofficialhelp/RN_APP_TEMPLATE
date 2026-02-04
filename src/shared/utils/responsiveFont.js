import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// iPhone 8 baseline
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

export const RF = size => {
    const scaleWidth = width / BASE_WIDTH;
    const scaleHeight = height / BASE_HEIGHT;

    // Use smaller scale to avoid huge fonts on tall screens
    const scale = Math.min(scaleWidth, scaleHeight);

    const newSize = size * scale;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
