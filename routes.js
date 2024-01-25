import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './src/slices/themeSlice';

import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import Draft from './src/screens/Draft';
import { View } from 'react-native';
import DrawerElements from './src/components/DrawerElements'
import Category from './src/screens/Category';
import DatabaseHelper from './src/utils/Database';
import { setTasks } from './src/slices/tasksSlice';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => {
    const dark = useSelector(selectTheme);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: dark ? '#000' : '#fff',
                },
                headerTintColor: dark ? '#fff' : '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'transparent',
                    flex: 1,
                },
                presentation: 'transparentModal',
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name='CategoryListing' component={Category} />
        </Stack.Navigator>
    );
};

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={DrawerElements}
            drawerStyle={{
                backgroundColor: '#fff',
            }}
        >
            <Drawer.Screen name="App" options={{ headerShown: false, drawerPosition: 'right' }} component={AppStack} />
        </Drawer.Navigator>
    );
};

const Routes = () => {
    const dispatch = useDispatch()
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        DatabaseHelper.getAllTasks((tasksData) => {
            dispatch(setTasks(tasksData))
        });
        setLoading(false)
    }, []);

    return (
        <NavigationContainer>
            {Loading ? (<SplashScreen />) : (<DrawerStack />)}
        </NavigationContainer>
    );
};

export default Routes;