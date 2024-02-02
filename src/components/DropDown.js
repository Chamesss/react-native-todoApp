import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { deleteTaskByIdHelper } from '../helpers/DatabaseActionsHelper'
import { useDispatch } from 'react-redux'
import { taskReset } from '../slices/selectionSlice'

export default function DropDown({ selectedTasks }) {
    const [show, setShow] = useState(false);
    const progressHeight = useSharedValue(0);
    const arrowHeight = useSharedValue(0)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: progressHeight.value,
        }
    });

    const animatedArrow = useAnimatedStyle(() => {
        return {
            borderTopWidth: arrowHeight.value,
            borderBottomWidth: arrowHeight.value,
        }
    });

    const startAnimation = () => {
        progressHeight.value === 0 && (
            (arrowHeight.value = withTiming(10, { duration: 1 })),
            (progressHeight.value = withTiming(100, { duration: 300 })),
            (setShow(true)))
        progressHeight.value > 0 && (
            (progressHeight.value = withTiming(0, { duration: 300 })),
            setTimeout(() => {
                arrowHeight.value = withTiming(0, { duration: 1 })
                setShow(false);
            }, 200))
    }

    const deleteTask = () => {
        selectedTasks.tasksSelected.length > 0 &&
            selectedTasks.tasksSelected.map((task) => deleteTaskByIdHelper(task, dispatch))
        dispatch(taskReset())
        startAnimation()
    }

    return (
        <View>
            <TouchableOpacity onPress={startAnimation}>
                <Icon name="dots-three-vertical" color="white" size={25} />
            </TouchableOpacity>
            <Animated.View style={[styles.container, animatedStyle]}>
                {show && (
                    <View className="flex-col p-4">
                        <TouchableOpacity disabled={selectedTasks.tasksSelected.length !== 1} onPress={() => navigation.navigate('EditTask', { EditTask: selectedTasks.tasksSelected[0] })}>
                            <View className={`items-center flex-row ${selectedTasks.tasksSelected.length !== 1 && 'opacity-50'}`}>
                                <Icon2 size={25} name='clipboard-edit' color='rgb(55, 65, 81)' />
                                <Text className='text-lg font-semibold color-gray-700'> Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteTask} disabled={selectedTasks.tasksSelected.length === 0} className='mt-5'>
                            <View className={`items-center flex-row ${selectedTasks.tasksSelected.length === 0 && 'opacity-50'}`}>
                                <Icon2 name='delete' size={25} color='#D11A2A' />
                                <Text className='text-lg font-semibold color-gray-700'>Delete ({selectedTasks.tasksSelected.length})</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
            <Animated.View style={[styles.arrow, animatedArrow]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 0,
        backgroundColor: 'white',
        position: 'absolute',
        right: -12,
        marginTop: 30,
        borderRadius: 10,
        elevation: 5,
        top: 10,
        overflow: 'hidden'
    },
    arrow: {
        position: 'absolute',
        top: 25,
        right: 7,
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: 'white',
        transform: [{ rotate: '90deg' }],
    },
});
