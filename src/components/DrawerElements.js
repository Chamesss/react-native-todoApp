import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Text, View, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import { switchThemeAsync } from '../slices/themeSlice';

const DrawerElements = (props) => {
    const dark = useSelector(selectTheme)
    const dispatch = useDispatch()
    return (
        <DrawerContentScrollView {...props}>
            <View className='justify-center items-center w-full'>
                <Text className='text-center tracking-wider'>Settings</Text>
                <View>
                    <Switch onChange={() => { dispatch(switchThemeAsync()) }} />
                </View>
                <Text>AAAAAA</Text>
            </View>
        </DrawerContentScrollView>
    );
};

export default DrawerElements;