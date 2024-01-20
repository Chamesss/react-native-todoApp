import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { svgs } from './constants'

export default function TaskBox({ categoryName, itemCount }) {
    const SVG = svgs[categoryName]
    return (
        <View className='bg-slate-500 p-4 rounded-md shadow-lg'>
            <SVG width={40} height={40} />
            <Text className='color-white text-2xl mt-10'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
            <Text className='color-white/[.6] text-lg'>{itemCount}{' '}{itemCount.toString() === '1' ? 'Task' : 'Tasks'}</Text>
        </View>
    )
}