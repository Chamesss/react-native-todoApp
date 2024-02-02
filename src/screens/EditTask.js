import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Pressable,
    Platform
} from 'react-native'
import { useState } from 'react'
import Icon2 from 'react-native-vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux'
import CategoryModal from '../components/CategoryModal'
import { useNavigation } from '@react-navigation/native'
import { TimerSetter, DateSetter } from '../helpers/TasksTimerHelper'
import { EditTaskHelper } from '../helpers/DatabaseActionsHelper'

export default function EditTask({ route }) {
    const { EditTask } = route.params
    const [newDate, setNewDate] = useState(() => new Date(EditTask.ending).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    }))
    const [hours, setHours] = useState(() => {
        const endingTime = new Date(EditTask.ending);
        endingTime.setHours(endingTime.getHours() - 1);
        return endingTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });
    });
    const [finishDate, setFinishDate] = useState(new Date(new Date(EditTask.ending)))
    const [showPicker, setShowPicker] = useState(false)
    const [showTimer, setShowTimer] = useState(false)
    const [category, setCategory] = useState(EditTask.category)
    const [title, setTitle] = useState(EditTask.title)
    const [taskError, setTaskError] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handlePickerChange = ({ type }, selectedDate) => {
        setShowPicker(false);
        if (type === 'set') {
            const newFinishDate = DateSetter(finishDate, selectedDate)
            setNewDate(selectedDate.toDateString().slice(4, 10));
            setFinishDate(newFinishDate);
        }
    }

    const handleTimerChange = ({ type }, selectedDate) => {
        setShowTimer(false);
        if (type === 'set') {
            const { timeString, newFinishDate } = TimerSetter(finishDate, selectedDate)
            setHours(timeString);
            setFinishDate(newFinishDate);
        }
    };

    const handleCreateTask = () => {
        const date = finishDate.toISOString()
        title.length > 0 ?
            EditTaskHelper(title, date, category, EditTask.id, dispatch, navigation) :
            setTaskError(true)
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
                        <Text className='color-black text-2xl tracking-wide'>{EditTask.title}</Text>
                        <Icon2 name='x' size={35} style={{ position: 'absolute', right: 22 }} color='black'
                            onPress={() => navigation.goBack()}
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
                            onChangeText={(text) => (setTitle(text), setTaskError(false))}
                            value={title}
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
                        <TouchableOpacity onPress={() => setOpen(!open)}>
                            <View className='flex-row items-center mt-5 mb-8'>
                                <Icon2 name='tag' size={20} color={category === 'undefined' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)'} />
                                {category === 'undefined' ? (
                                    <Text className='color-black/[.5] text-xl ml-5'>Category</Text>
                                ) : (
                                    <Text className='text-xl ml-5'>{category[0].toUpperCase() + category.slice(1)}</Text>
                                )}
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
                    <Text className='text-center tracking-widest text-lg font-semibold color-white'>Save</Text>
                </Pressable>
            </View>
            <CategoryModal open={open} setOpen={setOpen} category={category} setCategory={setCategory} />
        </View>
    )
}