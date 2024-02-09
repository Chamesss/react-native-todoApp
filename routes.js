import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './src/DrawerStack';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from './src/slices/tasksSlice';
import { selectTheme } from './src/slices/themeSlice';
import { StatusBar } from 'react-native';
import db from './src/helpers/DatabaseActionsHelper';

const Routes = () => {
    const [Loading, setLoading] = useState(true)
    const dark = useSelector(selectTheme)
    const dispatch = useDispatch()
    useEffect(() => {

        const setData = (data) => {
            return new Promise((resolve, reject) => {
                dispatch(setTasks((data)))
                resolve()
            })
        }

        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, created TEXT, ending TEXT, status TEXT, category TEXT)')
        });


        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tasks', null,
                (txObj, resultSet) => setData(resultSet.rows._array).then(() => setLoading(false)).catch((error) => console.log(error)),
                (txObj, error) => console.log(error)
            );
        })

    }, [])

    return (
        <NavigationContainer>
            <StatusBar
                translucent={false}
                backgroundColor={dark ? 'rgb(15 23 42)' : 'rgb(248 250 252)'}
                barStyle={dark ? 'light-content' : 'dark-content'}
            />
            {Loading ? (null) : (<DrawerStack />)}
        </NavigationContainer>
    );
};

export default Routes;