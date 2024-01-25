import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import Icon2 from 'react-native-vector-icons/Feather'
import React, { useState } from 'react'
import ModalWindow from './ModalWindow'

export default function Add() {
    const [isModalVisible, setModalVisible] = useState(null)
    return (
        <>
            <View className='absolute bottom-0 right-0'>
                <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
                    <View style={styles.dropShadow} className='mr-6 mb-12 w-20 h-20 rounded-full items-center justify-center filter drop-shadow-4xl'>
                        <Icon2 color='white' name='plus' size={30} />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(!isModalVisible)}
            >
                <ModalWindow exitModal={setModalVisible} />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    dropShadow: {
        backgroundColor: '#3b82f6',
        shadowColor: 'rgba(10, 182, 171, 0.4)',
        //shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 8,
    }
})