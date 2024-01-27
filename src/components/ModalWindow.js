import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View, TextInput, Pressable, Platform, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFormattedDateWithName, getDateHours } from '../utils/Date'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux'
import { taskAdded } from '../slices/tasksSlice'
import * as SQLite from 'expo-sqlite'


export default function ModalWindow({ exitModal }) {
    const date = getFormattedDateWithName()
    const [dayName, monthName, year] = date.split(', ');
    const [newDate, setNewDate] = useState(() => monthName.slice(0, 3) + monthName.slice(-3))
    const [hours, setHours] = useState(() => getDateHours())


    const [finishDate, setFinishDate] = useState(new Date(new Date().getTime() + 120 * 60 * 1000));
    const [showPicker, setShowPicker] = useState(false)
    const [showTimer, setShowTimer] = useState(false)
    const [task, setTask] = useState(null)
    const [taskError, setTaskError] = useState(false)
    const db = SQLite.openDatabase('storage.db')

    const handlePickerChange = ({ type }, selectedDate) => {
        setShowPicker(false);
        if (type === 'set') {
            const existingHours = finishDate.getHours();
            const existingMinutes = finishDate.getMinutes();
            const newFinishDate = new Date(selectedDate);
            newFinishDate.setHours(existingHours, existingMinutes, 0, 0);
            setNewDate(selectedDate.toDateString().slice(4, 10));
            setFinishDate(newFinishDate);
        }
    }

    const handleTimerChange = ({ type }, selectedDate) => {
        setShowTimer(false);
        if (type === 'set') {
            const existingYear = finishDate.getFullYear();
            const existingMonth = finishDate.getMonth();
            const existingDay = finishDate.getDate();
            const newFinishDate = new Date(existingYear, existingMonth, existingDay, selectedDate.getHours() + 1, selectedDate.getMinutes(), 0, 0);
            const timeString = selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            setHours(timeString);
            setFinishDate(newFinishDate);
        }
    };

    const handleCreateTask = async () => {
        if (task && task.length > 0) {
            const currentDate = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
            const status = 'todo'
            const category = 'music'
            db.transaction(tx => {
                tx.executeSql('INSERT INTO tasks (title, created, ending, status, category) VALUES (?, ?, ?, ?, ?)',
                    [task, currentDate, finishDate.toISOString(), status, category],
                    (txObj, resultSet) => {
                        console.log(resultSet.insertId)
                        exitModal(false);
                    },
                    (txObj, error) => console.log(error)
                )
            })
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM tasks', null,
                    (txObj, resultSet) => console.log(resultSet.rows._array),
                    (txObj, error) => console.log(error)
                );
            })
        } else {
            setTaskError(true)
        }
    }

    return (

        <View className='flex-1 relative items-center w-full h-full pt-10 bg-white'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
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