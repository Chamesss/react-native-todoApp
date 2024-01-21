import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { svgs } from './constants'

export default function TaskBox({ categoryName, itemCount }) {
    const SVG = svgs[categoryName]
    return (
        <View className='bg-white white p-4 rounded-md shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]'>
            <SVG width={40} height={40} />
            <Text className=' text-2xl mt-10'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Text>
            <Text className='color-black/[.6] text-lg'>{itemCount}{' '}{itemCount.toString() === '1' ? 'Task' : 'Tasks'}</Text>
        </View>
    )
}