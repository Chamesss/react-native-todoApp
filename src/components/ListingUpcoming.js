import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import CustomCheckBox from './CustomCheckBox'
import { useSelector, useDispatch } from 'react-redux';
import { tasksSelected } from '../slices/selectionSlice'
import { handleSelection } from '../helpers/TasksSelectionHelper';

export default ListingUpcoming = ({ task }) => {

    let Array = useSelector(tasksSelected)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(() => {
        let isExist = Array.tasksSelected.filter((id) => task.id === id)
        return isExist.length > 0
    })
    const [dateString, setDateString] = useState('')

    useEffect(() => {
        const today = new Date()
        const taskDate = new Date(task.ending)
        taskDate.setHours(0, 0, 0, 0)
        const timeDifference = taskDate.getTime() - today.getTime()
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
        if (daysDifference === 0) {
            setDateString('Today')
        } else if (daysDifference === 1) {
            setDateString('Tomorrow')
        } else {
            setDateString(taskDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }))
        }
    }, [task]);

    return (
        <TouchableOpacity onPress={() => handleSelection(dispatch, selected, setSelected, task.id)}>
            <View className={`flex-row justify-between items-center p-4 mt-5`}>
                <View>
                    <Text className={`text-lg ${selected && ' font-semibold'}`}>{task.title}</Text>
                    <Text className={`${selected && ' font-semibold'}`}>
                        {task.ending.slice(11, 16)}
                        {'  '}
                        {dateString}
                    </Text>
                </View>
                <CustomCheckBox selected={selected} handleSelection={handleSelection} id={task.id} setSelected={setSelected} />
            </View>
        </TouchableOpacity>
    );
};