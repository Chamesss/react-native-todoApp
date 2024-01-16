import { Text, View, StyleSheet, Button, Switch, TouchableOpacity, FlatList, Modal } from 'react-native'
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

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalVisible, setModalVisible] = useState(null)
    console.log(isModalVisible)

    return (
        <View className={`relative flex-1 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <View className='bg-[#0ab6ab] w-full p-5 justify-between flex-row'>
                <Text className='text-xl font-medium tracking-wider'>Todo List</Text>
                <TouchableOpacity>
                    <Icon name='three-bars' size={30} />
                </TouchableOpacity>
            </View>
            <View className='p-5 mt-5'>
                <Text className='color-white text-start text-xl font-semibold tracking-wider'>Today</Text>
                <Text className='color-white opacity-50 mb-5'>{date}</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <TaskBox
                            item={item}
                            isSelected={item.id === selectedItemId}
                            onSelect={() => setSelectedItemId(item.id)}
                        />}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View className='absolute bottom-0 right-0'>
                <TouchableOpacity>
                    <View style={styles.dropShadow} className='mr-6 mb-12 w-20 h-20 rounded-full items-center justify-center filter drop-shadow-4xl'>
                        <Icon2 color='black' name='plus' size={30} />
                    </View>
                </TouchableOpacity>
            </View>

            <View className='absolute bottom-0 right-0'>
                <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
                    <View style={styles.dropShadow} className='mr-6 mb-12 w-20 h-20 rounded-full items-center justify-center filter drop-shadow-4xl'>
                        <Icon2 color='black' name='plus' size={30} />
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

            {/* <View onChange={() => { dispatch(switchThemeAsync()) }}>
                <Switch value={dark === true} />
            </View>
            <Button
                onPress={() => { navigation.navigate('Draft') }}
                title='Go to draft'
                color={dark ? 'rgb(21 94 117)' : 'rgb(34 211 238)'}
                accessibilityLabel="Learn more about this purple button"
            /> */}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    dropShadow: {
        backgroundColor: 'rgba(10, 182, 171, 1)',
        shadowColor: 'rgba(10, 182, 171, 0.4)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 8,
    }
})