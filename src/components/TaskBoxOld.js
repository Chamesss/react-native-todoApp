import { Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'

const TaskBox = ({ item, isSelected, onSelect }) => {
    const [pressed, setPressed] = useState(isSelected || null)
    const animation = useRef(new Animated.Value(60)).current

    const handleToggle = () => {
        const targetHeight = pressed ? 60 : 100;
        setPressed((prevState) => !prevState)
        Animated.timing(animation, {
            toValue: targetHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();
        onSelect();
    }

    useLayoutEffect(() => {
        if (!isSelected && pressed) {
            setPressed((prevState) => !prevState)
            Animated.timing(animation, {
                toValue: 60,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [isSelected]);

    return (
        <TouchableOpacity onPress={handleToggle} >
            <Animated.View className='w-full relative bg-white/[.1] p-5 mt-2 mb-2 rounded-lg' style={{ height: animation }}>
                <View className='flex-row justify-between items-center'>
                    <View className='items-center flex-row'>
                        {item.status === 'done' ? (
                            <Icon color='rgba(255,255,255,0.5)' size={25} name='check-circle-outline' />
                        ) : (
                            <Icon color='rgba(255,255,255,1)' size={25} name='circle-outline' />
                        )}
                        <Text className={`ml-3 ${item.status === 'done' ? 'color-white/[.5] line-through' : 'color-white'}`}>{item.title}</Text>
                    </View>
                    <Text className='color-white/[.5]'>{item.ending.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                </View>
                {pressed && (
                    <View className='absolute right-5 items-center flex-row justify-between w-full bottom-2'>
                        <TouchableOpacity>
                            <Icon name='delete' color='#d11a2a' size={30} />
                        </TouchableOpacity>
                        <Text className='color-white/[.5]'>Created: {item.created.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
                        <TouchableOpacity>
                            <Icon2 name='edit' color='white' size={30} />
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
        </TouchableOpacity>
    )
}

export default TaskBox