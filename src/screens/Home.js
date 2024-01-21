import { Text, View, StyleSheet, Button, Switch, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from '../slices/themeSlice'
import { switchThemeAsync } from '../slices/themeSlice'
import { useNavigation } from '@react-navigation/native'
import { data } from '../components/constants'
import Icon from 'react-native-vector-icons/Octicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { getFormattedDate } from '../utils/Date'
import TaskBox from '../components/TaskBox'
import ModalWindow from '../components/ModalWindow'

const Home = () => {
    const todoTasks = data.filter((item) => item.status === 'todo');
    const completedTasks = data.filter((item) => item.status === 'done');
    const dispatch = useDispatch();
    const dark = useSelector(selectTheme)
    const navigation = useNavigation()
    const date = getFormattedDate()
    const categories = useState(() => {
        const countByCategory = {};
        data.forEach((item) => countByCategory[item.category] = (countByCategory[item.category] || 0) + 1)
        return countByCategory;
    })
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalVisible, setModalVisible] = useState(null)

    return (
        <>
            <View className={`relative flex-1 ${dark ? 'bg-slate-900' : 'bg-[rgb(252,252,252)]'}`}>
                <View className='flex-row justify-between items-start pt-8 px-8'>
                    <View>
                        <Text className=' text-start text-xl font-semibold tracking-wider'>Today</Text>
                        <Text className=' opacity-50 mb-5'>{date}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon color={'black'} name='three-bars' size={30} />
                    </TouchableOpacity>
                </View>
                <View className='mt-4 px-8 pb-4'>
                    <Text className=' text-3xl font-semibold tracking-widest'>Lists</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className='mt-5 pb-4 justify-center items-center flex-wrap flex-row gap-4'>
                        <View className='w-48 h-48'>
                            <TaskBox categoryName={'all'} itemCount={212} />
                        </View>
                        {Object.entries(categories[0]).map((item) => <View className='w-48 h-48'>
                            <TaskBox categoryName={item[0]} itemCount={item[1]} />
                        </View>)}
                        {/* <FlatList
                            data={Object.entries(categories[0])}
                            renderItem={({ item }) => (
                                <TaskBox
                                    categoryName={item[0]}
                                    itemCount={item[1]}
                                />
                            )}
                            keyExtractor={(item) => item[0]}
                        /> */}
                    </View>
                </ScrollView>
            </View>

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
            {/* 
            <Button
                onPress={() => { navigation.navigate('Draft') }}
                title='Go to draft'
                color={dark ? 'rgb(21 94 117)' : 'rgb(34 211 238)'}
                accessibilityLabel="Learn more about this purple button"
            /> */}
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    dropShadow: {
        backgroundColor: '#3b82f6',
        shadowColor: 'rgba(10, 182, 171, 0.4)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 8,
    }
})