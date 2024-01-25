import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import { colors } from '../components/constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import { svgs } from '../components/constants'
import ListingLate from '../components/ListingLate'
import ListingUpcoming from '../components/ListingUpcoming'
import ListingDone from '../components/ListingDone'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { GradientMask } from '../components/GradientMask'

export default function Category({ route }) {
    const [lateTasks, setLateTasks] = useState(null)
    const [finishedTasks, setFinishedTasks] = useState(null)
    const [upcomingTasks, setUpcomingTasks] = useState(null)
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(false)
    const { categoryName, itemCount, tasks } = route.params;
    const color = colors[categoryName];
    const SVG = svgs[categoryName]
    const navigation = useNavigation()

    useEffect(() => {
        if (tasks.length > 0) {
            const currentTime = new Date();
            const lateTasks = tasks.filter(task => {
                const taskEndingTime = new Date(task.ending);
                return taskEndingTime < currentTime && task.status === 'todo'
            })
            const finishedTasks = tasks.filter(task => task.status === 'done')
            const upcomingTasks = tasks.filter(task => {
                const taskEndingTime = new Date(task.ending);
                return taskEndingTime > currentTime && task.status === 'todo'
            })
            setLateTasks(lateTasks)
            setFinishedTasks(finishedTasks)
            setUpcomingTasks(upcomingTasks)
        } else {
            setEmpty(true)
        }
        setLoading(false)
    }, [tasks])
    return (
        <>
            {!loading && <View className={`relative flex-1 ${color}`}>
                <View className='px-8 pt-8 pb-4'>
                    <View className='flex-row justify-between items-center'>
                        <Icon name='left' color='white' size={25} onPress={() => navigation.goBack()} />
                        <Icon2 name='dots-three-vertical' color='white' size={25} />
                    </View>
                    <View className='p-4'>
                        <View className='bg-white rounded-full w-16 h-16 items-center justify-center mt-14'>
                            <SVG style={{ marginLeft: 5, marginTop: 5 }} width={40} height={40} />
                        </View>
                        <Text className='color-white text-4xl font-semibold mt-4'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
                        <Text className='color-white text-lg'>{itemCount}{' '}{itemCount.toString() === '1' ? 'Task' : 'Tasks'}</Text>
                    </View>
                </View>
                <View className='flex-1 w-full bg-white h-full rounded-tr-[30px] rounded-tl-[30px]'>
                    <GradientMask />
                    <ScrollView>
                        <View className='p-8'>
                            {lateTasks?.length > 0 && <Text className='text-lg tracking-wider font-semibold px-4 mt-4 opacity-50'>Late</Text>}
                            {lateTasks?.map((item) => <ListingLate key={item.id} task={item} />)}
                            {upcomingTasks?.length > 0 && <Text className='text-lg tracking-wider font-semibold px-4 mt-8 opacity-50'>Upcoming</Text>}
                            {upcomingTasks?.map((item) => <ListingUpcoming key={item.id} task={item} />)}
                            {finishedTasks?.length > 0 && <Text className='text-lg tracking-wider font-semibold px-4 mt-8 opacity-50'>Done</Text>}
                            {finishedTasks?.map((item) => <ListingDone key={item.id} task={item} />)}
                        </View>
                    </ScrollView>
                </View>
                <Add />
                {/* <View className='p-8'>
                            {lateTasks && lateTasks.length > 0 && (
                                <View>
                                    <Text className='text-lg tracking-wide opacity-50 px-4 pt-4'>Late</Text>
                                    {lateTasks.map((item) => <ListingLate key={item.id} task={item} />)}
                                </View>
                            )}
                            {upcomingTasks && upcomingTasks.length > 0 && (
                                <View>
                                    <Text className='text-lg tracking-wide opacity-50 mt-8 px-4'>Upcoming</Text>
                                    <ListingUpcoming tasks={upcomingTasks} />
                                </View>
                            )}
                            {finishedTasks && finishedTasks.length > 0 && (
                                <View>
                                    <Text className='text-lg tracking-wide opacity-50 mt-8 px-4'>Done</Text>
                                    <ListingDone tasks={finishedTasks} />
                                </View>
                            )}
                        </View> */}
            </View>}
        </>
    )
}

const styles = StyleSheet.create({})