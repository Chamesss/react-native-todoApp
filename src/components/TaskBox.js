import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { svgs } from './constants'
import { useNavigation } from '@react-navigation/native'

export default function TaskBox({ categoryName, itemCount, tasks }) {
    const SVG = svgs[categoryName]
    const navigation = useNavigation()
    console.log(tasks[0])
    return (
        <Pressable onPress={() => navigation.navigate('CategoryListing', { categoryName, itemCount, tasks })}>
            <View className='bg-white white p-4 rounded-md shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]'>
                <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { categoryName, itemCount, tasks })}>
                    <SVG width={40} height={40} />
                    <Text className=' opacity-80 text-2xl mt-10'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
                    <Text className='color-black/[.6] text-lg'>{itemCount}{' '}{itemCount.toString() === '1' ? 'Task' : 'Tasks'}</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}