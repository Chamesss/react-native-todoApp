import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomCheckBox from './CustomCheckBox'
import { tasksSelected } from '../slices/selectionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { handleSelection } from '../helpers/TasksSelectionHelper';


export default function ListingLate({ task }) {

    let Array = useSelector(tasksSelected)
    const dispatch = useDispatch()
    const [ending] = useState(new Date(task.ending))
    const [selected, setSelected] = useState(() => {
        let isExist = Array.tasksSelected.filter((id) => task.id === id)
        return isExist.length > 0
    })

    return (
        <TouchableOpacity onPress={() => handleSelection(dispatch, selected, setSelected, task.id)}>
            <View className={`flex-row justify-between items-center p-4 mt-5`}>
                <View>
                    <Text className={`text-lg ${selected && ' font-semibold'}`}>{task.title}</Text>
                    <Text className={`color-red-500 ${selected && ' font-semibold'}`}>
                        {ending.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        {'  '}
                        {ending.toLocaleString('en-US', { month: 'short', day: '2-digit' })}
                    </Text>
                </View>
                <CustomCheckBox selected={selected} handleSelection={handleSelection} id={task.id} setSelected={setSelected} />
            </View>
        </TouchableOpacity>
    )
}