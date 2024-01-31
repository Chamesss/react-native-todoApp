import { TouchableOpacity, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import Icon2 from 'react-native-vector-icons/Entypo'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function DropDown() {

    const [show, setShow] = useState(false)
    const progressWidth = useSharedValue(0);
    const progressHeight = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: progressWidth.value,
            height: progressHeight.value
        };
    })

    const startAnimation = () => {
        progressWidth.value === 0 && (
            (progressWidth.value = withTiming(150, { duration: 150 })),
            (progressHeight.value = withTiming(100, { duration: 150 })),
            setTimeout(() => {
                setShow(true)
            }, 100))
        progressWidth.value === 150 && (
            (progressWidth.value = withTiming(0, { duration: 150 })),
            (progressHeight.value = withTiming(0, { duration: 150 })),
            setShow(false))
    };

    return (
        <View className='relative'>
            <TouchableOpacity onPress={() => startAnimation()}>
                <Icon2 name="dots-three-vertical" color="white" size={25} />
            </TouchableOpacity>
            <Animated.View style={[{ width: 0, height: 0, backgroundColor: 'white', position: 'absolute', right: 17, marginTop: 30, borderTopLeftRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }, animatedStyle]}>
                {show &&
                    <View className='p-4 justify-center'>
                        <Text className='p-2 text-lg'>Delete</Text>
                        <Text className='p-2 text-lg'>Edit</Text>
                    </View>
                }
            </Animated.View>
        </View>
    )
}