import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const useSlideAnimation = () => {
    const progress = useSharedValue(-100);
    const hide = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            bottom: progress.value,
        };
    });

    const hidingStyle = useAnimatedStyle(() => {
        return {
            right: hide.value,
        };
    });

    const startAnimation = (tasksSelectedLength) => {
        if (tasksSelectedLength > 0) {
            progress.value = withTiming(0, { duration: 150 });
            hide.value = withTiming(-120, { duration: 75 });
        } else {
            progress.value = withTiming(-80, { duration: 150 });
            hide.value = withTiming(0, { duration: 75 });
        }
    };

    return { animatedStyle, hidingStyle, startAnimation };
};