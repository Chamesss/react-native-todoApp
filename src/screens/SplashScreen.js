import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../slices/themeSlice';

const SplashScreen = () => {
    const dark = useSelector(selectTheme)
    return (
        <View className={`flex-1 items-center justify-center ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <Image source={require('../../assets/favicon.png')} />
        </View>
    );
};

export default SplashScreen;