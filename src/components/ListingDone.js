import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomCheckBox from './CustomCheckBox'
import { tasksSelected } from '../slices/selectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { handleSelection } from '../helpers/TasksSelectionHelper';

export default function ListingDone({ task }) {

    let Array = useSelector(tasksSelected)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(() => {
        let isExist = Array.tasksSelected.filter((id) => task.id === id)
        return isExist.length > 0
    })

    return (
        <TouchableOpacity onPress={() => handleSelection(dispatch, selected, setSelected, task.id)}>
            <View className={`flex-row opacity-70 justify-between items-center p-4 mt-5`}>
                <View>
                    <Text className={`text-lg color-blue-600 line-through ${selected && ' font-semibold'}`}>{task.title}</Text>
                    <Text className={`${selected && ' font-semibold'}`}>
                        {task.ending.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        {'  '}
                        {task.ending.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                    </Text>
                </View>
                <CustomCheckBox selected={selected} handleSelection={handleSelection} id={task.id} setSelected={setSelected} />
            </View>
        </TouchableOpacity>
    )
}