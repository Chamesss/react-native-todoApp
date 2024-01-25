import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View, TextInput, Pressable, Platform, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFormattedDateWithName, getDateHours } from '../utils/Date'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function ModalWindow({ exitModal }) {
    const date = getFormattedDateWithName()
    const [dayName, monthName, year] = date.split(', ');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [showTimer, setShowTimer] = useState(false)
    const [newDate, setNewDate] = useState(() => monthName.slice(0, 3) + monthName.slice(-3))
    const [hours, setHours] = useState(() => getDateHours())
    const [task, setTask] = useState(null)
    const [taskError, setTaskError] = useState(false)

    const handlePickerChange = ({ type }, selectedDate) => {
        setShowPicker(false);
        if (type === 'set') {
            setNewDate(selectedDate.toDateString().slice(4, 10))
            setFinishDate(selectedDate)
        }
    }

    const handleTimerChange = ({ type }, selectedDate) => {
        setShowTimer(false);
        if (type === 'set') {
            const date = selectedDate.toLocaleString()
            const hours = date.split(',')
            setHours(hours[1].slice(1, 6))
        }
    }

    const handleCreateTask = () => {
        task && task?.length > 0 ? exitModal(false) : setTaskError(true)
    }

    // const confirmIOS = (date) => {
    //     setFinishDate(date)
    //     setShowPicker(false)
    // }
    return (

        <View className='flex-1 relative items-center w-full h-full pt-10 bg-white'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='relative flex-row px-8 items-center w-full justify-center'>
                        <Text className='color-black text-2xl tracking-wide'>New Task</Text>
                        <Icon2 name='x' size={35} style={{ position: 'absolute', right: 22 }} color='black'
                            onPress={() => exitModal(false)}
                        />
                    </View>
                    <View className='mt-16 px-8 w-full'>
                        <Text className='color-black/[.5] text-xl tracking-wider mb-4'>What are you planning?</Text>
                        <TextInput
                            className='w-full text-xl py-4 color-black'
                            selectionColor={'black'}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            onChangeText={(text) => (setTask(text), setTaskError(false))}
                            value={task}
                        />
                        {/* <Pressable onPress={() => setShowPicker(!showPicker)}>
                            <Icon onPressIn={() => setShowPicker(!showPicker)} name='calendar-today' color='white' size={40} />
                            </Pressable> */}
                        <View className='relative'>
                            {taskError && (
                                <Text className='absolute color-red-600 text-sm'>Add your task here please.</Text>
                            )}
                        </View>
                        <View className='border border-black/[.2] my-8' />
                        <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
                            <View className='flex-row items-center'>
                                <Icon2 onPressIn={() => setShowPicker(!showPicker)} name='bell' size={20} color='black' />
                                <Text className='color-black text-xl ml-5'>{newDate}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowTimer(!showTimer)}>
                            <View className='flex-row items-center mt-5'>
                                <Icon2 name='clock' size={20} color='black' />
                                <Text className='color-black text-xl ml-5'>{hours}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className='flex-row items-center mt-5 mb-8'>
                                <Icon2 name='tag' size={20} color='rgba(0, 0, 0, 0.5)' />
                                <Text className='color-black/[.5] text-xl ml-5'>Category</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {showPicker && (
                        <DateTimePicker
                            mode='date'
                            display='default'
                            value={finishDate}
                            onChange={handlePickerChange}
                            style={{
                                height: 120, marginTop: -10
                            }}
                        />
                    )}
                    {showPicker && Platform.OS === 'ios' && (
                        <View className='flex-row justify-around'>
                            <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
                                <Text className='text-center color-white'>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmIOS}>
                                <Text className='text-center color-white'>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {showTimer && (
                        <DateTimePicker
                            mode='time'
                            display='clock'
                            value={finishDate}
                            onChange={handleTimerChange}
                            style={{
                                height: 120, marginTop: -10
                            }}
                        />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
            <View className=' justify-end w-full'>
                <Pressable onPress={handleCreateTask} className='bg-blue-500 p-5'>
                    <Text className='text-center tracking-widest text-lg font-semibold color-white'>Create</Text>
                </Pressable>
            </View>
        </View>

    )
}