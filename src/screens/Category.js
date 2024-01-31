import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import { colors } from '../components/constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import { svgs } from '../components/constants'
import ListingLate from '../components/ListingLate'
import ListingUpcoming from '../components/ListingUpcoming'
import ListingDone from '../components/ListingDone'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { GradientMask } from '../components/GradientMask'
import { useDispatch, useSelector } from 'react-redux'
import { tasksSelected, taskReset } from '../slices/selectionSlice'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'
import { useSlideAnimation } from './Animations/CategoryAnimations'
import { TasksFilter } from '../helpers/TasksFilterHelper'
import { taskDeleted, tasks } from '../slices/tasksSlice'

export default function Category({ route }) {

    const [lateTasks, setLateTasks] = useState(null)
    const [finishedTasks, setFinishedTasks] = useState(null)
    const [upcomingTasks, setUpcomingTasks] = useState(null)
    const [loading, setLoading] = useState(true)
    const [Show, setShow] = useState(false)
    const { categoryName } = route.params;
    const color = colors[categoryName];
    const SVG = svgs[categoryName]
    const navigation = useNavigation()
    const selectedTasks = useSelector(tasksSelected)
    const Tasks = useSelector(tasks)
    const [itemCount, setItemCount] = useState(Tasks.tasks.length)
    const dispatch = useDispatch()
    const { animatedStyle, hidingStyle, startAnimation } = useSlideAnimation();

    useEffect(() => {
        return () => {
            dispatch(taskReset());
        }
    }, [])

    useEffect(() => {
        selectedTasks.tasksSelected.length > 0 ?
            (setShow(true),
                startAnimation(selectedTasks.tasksSelected.length))
            : (startAnimation(selectedTasks.tasksSelected.length),
                setTimeout(() => {
                    setShow(false)
                }, 200)
            )
    }, [selectedTasks.tasksSelected.length]);

    useEffect(() => {
        setItemCount(Tasks.tasks.length)
        if (Tasks.tasks.length > 0) {
            const { lateTasks, finishedTasks, upcomingTasks } = TasksFilter(Tasks.tasks);
            setLateTasks(lateTasks)
            setFinishedTasks(finishedTasks)
            setUpcomingTasks(upcomingTasks)
        }
        setLoading(false)
    }, [Tasks])

    const deleteTask = () => {
        dispatch(taskDeleted(selectedTasks.tasksSelected))
        dispatch(taskReset())
        setShow(false)
    }

    return (
        <>
            {!loading && <View className={`relative flex-1 ${color}`}>
                <View className='px-8 pt-8 pb-1'>
                    <View className='flex-row justify-between items-center'>
                        <Icon name='left' color='white' size={25} onPress={() => navigation.goBack()} />
                        <Icon2 name='dots-three-vertical' color='white' size={25} />
                    </View>
                    <View className='p-4'>
                        <View className={`bg-white rounded-full w-16 h-16 items-center justify-center mt-14`}>
                            <SVG style={{ marginLeft: 5, marginTop: 5 }} width={40} height={40} />
                        </View>
                        <Text className='color-white text-4xl font-semibold mt-4'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
                        <Text className='color-white text-lg'>{itemCount}{' '}{itemCount.toString() === '1' ? 'Task' : 'Tasks'}</Text>
                    </View>
                </View>
                <View className='flex-1 w-full bg-white h-full rounded-tr-[30px] rounded-tl-[30px]'>
                    <GradientMask />
                    <ScrollView>
                        {Tasks.tasks.length > 0 ? (
                            <View className='p-8'>
                                {lateTasks?.length > 0 && <Text className='text-lg tracking-wider font-semibold px-4 mt-4 opacity-50'>Late</Text>}
                                {lateTasks?.map((item) =>
                                    <Animated.View
                                        key={item.id}
                                        entering={FadeIn}
                                        exiting={FadeOut}
                                        layout={Layout.delay(500)}
                                    >
                                        <ListingLate task={item} />
                                    </Animated.View>
                                )}
                                {upcomingTasks?.length > 0 && <Text className='text-lg tracking-wider font-semibold px-4 mt-8 opacity-50'>Upcoming</Text>}
                                {upcomingTasks?.map((item) => <ListingUpcoming key={item.id} task={item} />)}
                                {finishedTasks?.length > 0 && <Text className='text-lg tracking-wider font-semibold px-4 mt-8 opacity-50'>Done</Text>}
                                {finishedTasks?.map((item) => <ListingDone key={item.id} task={item} />)}
                            </View>
                        ) : (
                            <View className='p-8'>
                                <Text className='text-center mt-24 tracking-wider text-lg'>Start adding tasks!</Text>
                            </View>
                        )}

                    </ScrollView>
                </View>
                {Show &&
                    <Animated.View className='flex-row bg-slate-100 justify-around p-4 w-full z-50 absolute' style={[{ bottom: -100 }, animatedStyle]}>
                        <TouchableOpacity disabled={selectedTasks.tasksSelected.length > 1} onPress={() => {
                            const selectedTask = Tasks.find(task => task.id === selectedTasks.tasksSelected[0]);
                            navigation.navigate('EditTask', { EditTask: selectedTask });
                        }}>
                            <View className={`items-center ${selectedTasks.tasksSelected.length > 1 && 'opacity-50'}`}>
                                <Icon3 size={25} name='clipboard-edit' color='rgb(55, 65, 81)' />
                                <Text className='mt-1 text-lg font-semibold color-gray-700'>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteTask}>
                            <View className='items-center'>
                                <Icon3 name='delete' size={25} color='#D11A2A' />
                                <Text className='mt-1 text-lg font-semibold color-gray-700'>Delete ({selectedTasks.tasksSelected.length})</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                }
                <Animated.View style={[{ right: 0 }, hidingStyle]}>
                    <Add />
                </Animated.View>
            </View>}
        </>
    )
}