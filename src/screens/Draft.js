import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTheme } from '../slices/themeSlice'

export default function Draft() {
    const navigation = useNavigation()
    const dark = useSelector(selectTheme)
    return (
        <View className={`flex-1 items-center justify-center ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <Button
                title='Go back.'
                onPress={() => navigation.goBack()}
                color={dark ? 'rgb(21 94 117)' : 'rgb(34 211 238)'}
            />
        </View>
    )
}