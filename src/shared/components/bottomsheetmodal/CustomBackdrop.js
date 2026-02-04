import { useMemo } from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const CustomBackdrop = ({ animatedIndex, style, pressBehavior = 'close' }) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#000",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <BottomSheetBackdrop
        animatedIndex={animatedIndex}
        style={containerStyle}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={pressBehavior}
        opacity={0.2}
        enableTouchThrough={true}
    />
};

export default CustomBackdrop;