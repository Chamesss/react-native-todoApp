import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import { colors } from '../components/constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import { svgs } from '../components/constants'
import CheckBox from 'expo-checkbox';

export default function Category({ route }) {
    const [lateTasks, setLateTasks] = useState(null)
    const [finishedTasks, setFinishedTasks] = useState(null)
    const [upcomingTasks, setUpcomingTasks] = useState(null)
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const { categoryName, itemCount, tasks } = route.params;
    const color = colors[categoryName];
    const SVG = svgs[categoryName]

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
            <View className={`relative flex-1 ${color}`}>
                <View className='px-8 pt-8 pb-4'>
                    <View className='flex-row justify-between items-center'>
                        <Icon name='left' color='white' size={25} />
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
                <View className='w-full bg-white h-full rounded-tr-[30px] rounded-tl-[30px]'>
                    <View className='p-12'>
                        {lateTasks && (
                            <View>
                                <Text className='text-lg tracking-wide opacicty-50'>Late</Text>
                                {lateTasks.map((task) =>
                                    <View>
                                        <Text>{task.title}</Text>
                                        <CheckBox
                                            value={toggleCheckBox}
                                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
                <Add />
            </View>
        </>
    )
}

const styles = StyleSheet.create({})