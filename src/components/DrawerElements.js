import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useState } from 'react';
import { Text, View, Switch, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';
import { switchThemeAsync } from '../slices/themeSlice';

const DrawerElements = (props) => {
    const dark = useSelector(selectTheme)
    const [isDark, setDark] = useState(dark)
    const dispatch = useDispatch()

    const handleThemeSelection = () => {
        setDark((prev) => !prev)
        dispatch(switchThemeAsync())
    }

    return (
        <DrawerContentScrollView {...props}>
            <View className='justify-center items-center w-full p-8'>
                <Text className='text-center tracking-wider text-lg'>Settings</Text>
                <Pressable className='mt-4 justify-center items-center'>
                    <Switch value={isDark} onValueChange={handleThemeSelection} />
                    <Text>Coming soon!!!</Text>
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
};

export default DrawerElements;