import React from 'react';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from './src/slices/themeSlice';

import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import Draft from './src/screens/Draft';
import { View } from 'react-native';

const Stack = createStackNavigator();

const Routes = () => {
    const dark = useSelector(selectTheme)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
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
                    flex: 1
                },
                presentation: 'transparentModal',
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Draft" options={{ headerShown: true }} component={Draft} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;