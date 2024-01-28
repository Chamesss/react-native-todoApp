import { Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { svgs } from './constants';
import Icon from 'react-native-vector-icons/Octicons'

export default function CategoryModal({ open, setOpen, category, setCategory }) {
    const [name, setName] = useState(null)
    useEffect(() => {
        category !== name && setName(null)
    }, [open])
    return (
        <Modal
            visible={open}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
                open && setOpen(!open)
            }}
            style={{ alignItems: 'center' }}
        >
            <View style={{ backgroundColor: 'rgba(0,0,0,.6)' }} className='w-full h-full px-4 justify-center items-center' onPress={() => console.log('aaaaaaaaaaaa')}>
                <View className='bg-white rounded-md px-2 py-4'>
                    <View className='relative flex-row justify-center'>
                        <Text className='text-lg font-semibold mb-4'>Select a category</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 10 }}>
                            <Icon name='x' size={25} color='black' onPress={() => setOpen(!open)} />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row flex-wrap items-center justify-center'>
                        {Object.entries(svgs).map((svg) => {
                            const svgName = svg[0]
                            const SVG = svg[1]
                            if (svgName !== 'all') {
                                return (
                                    <TouchableOpacity key={svg[0]} onPress={() => setName(svgName)}>
                                        <View style={{ boxSizing: 'border-box' }} className={`flex-row gap-2 items-center py-1 px-4 ${name === svgName ? 'border-[#6c6c6c5c] border rounded-full bg-white shadow' : 'border border-transparent'}`}>
                                            <SVG width={30} height={30} />
                                            <Text>{svgName[0].toUpperCase() + svgName.slice(1)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                    <View className='flex-row justify-between mt-2'>
                        <TouchableOpacity onPress={() => setOpen(!open)}>
                            <View className='p-4'>
                                <Text className='text-lg color-red-500'>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setCategory(name); setOpen(!open) }} disabled={name === null}>
                            <View className='p-4'>
                                <Text className={`text-lg ${name === null && 'opacity-50'}`}>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}