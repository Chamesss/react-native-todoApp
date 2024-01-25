import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomCheckBox from './CustomCheckBox'

export default function ListingDone({ task }) {
    const [selected, setSelected] = useState(false)
    return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View className={`flex-row opacity-70 justify-between items-center p-4 mt-5 ${selected && 'bg-gray-100 rounded-lg'}`}>
                <View>
                    <Text className='text-lg color-blue-600 line-through'>{task.title}</Text>
                    <Text>
                        {task.ending.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        {'  '}
                        {task.ending.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                    </Text>
                </View>
                <CustomCheckBox setSelected={setSelected} selected={selected} />
            </View>
        </TouchableOpacity>
    )
}