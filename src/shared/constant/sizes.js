import { Dimensions, PixelRatio } from "react-native"
let { width, height } = Dimensions.get('window')
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;


const SIZES = {
    WIDTH: width,
    HEIGHT: height,
    SPACING: width * 0.05,
}

const RF = size => {
    const scaleWidth = width / BASE_WIDTH;
    const scaleHeight = height / BASE_HEIGHT;

    // Use smaller scale to avoid huge fonts on tall screens
    const scale = Math.min(scaleWidth, scaleHeight);

    const newSize = size * scale;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


export { SIZES, RF }