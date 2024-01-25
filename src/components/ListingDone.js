import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomCheckBox from './CustomCheckBox'

export default function ListingDone({ task }) {
    const [selected, setSelected] = useState(false)
    return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View className={`flex-row opacity-70 justify-between items-center p-4 mt-5`}>
                <View>
                    <Text className={`text-lg color-blue-600 line-through ${selected && ' font-semibold'}`}>{task.title}</Text>
                    <Text className={`${selected && ' font-semibold'}`}>
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