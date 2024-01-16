import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';

const SplashScreen = () => {
    const navigation = useNavigation()
    const dark = useSelector(selectTheme)
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 5000);
    }, []);

    return (
        <View className={`flex-1 items-center justify-center ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <StatusBar
                translucent={true}
                backgroundColor={dark ? 'rgb(15 23 42)' : 'rgb(248 250 252)'}
                barStyle={dark ? 'light-content' : 'dark-content'}
            />
            <Image source={require('../../assets/favicon.png')} />
            <ActivityIndicator size="small" color="#0000ff" />
        </View>
    );
};

export default SplashScreen;