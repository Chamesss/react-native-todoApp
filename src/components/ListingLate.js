import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomCheckBox from './CustomCheckBox'

export default function ListingLate({ task }) {
    const [selected, setSelected] = useState(false)
    const [ending] = useState(new Date(task.ending))
    return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View className={`flex-row justify-between items-center p-4 mt-5`}>
                <View>
                    <Text className={`text-lg ${selected && ' font-semibold'}`}>{task.title}</Text>
                    <Text className={`color-red-500 ${selected && ' font-semibold'}`}>
                        {ending.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        {'  '}
                        {ending.toLocaleString('en-US', { month: 'short', day: '2-digit' })}
                    </Text>
                </View>
                <CustomCheckBox setSelected={setSelected} selected={selected} />
            </View>
        </TouchableOpacity>
    )
}