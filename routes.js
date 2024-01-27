import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import DrawerStack from './src/DrawerStack';
import * as SQLite from 'expo-sqlite'
import { useDispatch } from 'react-redux';
import { setTasks } from './src/slices/tasksSlice';

const Routes = () => {
    const [Loading, setLoading] = useState(true)
    const db = SQLite.openDatabase('storage.db')
    const dispatch = useDispatch()
    useEffect(() => {

        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, created TEXT, ending TEXT, status TEXT, category TEXT)', null,
                (txObj, resultSet) => console.log(resultSet.rows._array),
                (txObj, error) => console.log(error)
            )
        });

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tasks', null,
                (txObj, resultSet) => dispatch(setTasks((resultSet.rows._array))),
                (txObj, error) => console.log(error)
            );
        })

        setLoading(false)

    }, [])

    return (
        <NavigationContainer>
            {Loading ? (<SplashScreen />) : (<DrawerStack />)}
        </NavigationContainer>
    );
};

export default Routes;