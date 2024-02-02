import { taskEdited, taskAdded, taskDeleted, taskDone } from "../slices/tasksSlice";
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('storage.db');

export default db;

export const EditTaskHelper = (title, date, category, id, dispatch, navigation) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE tasks SET title = ?, ending = ?, category = ? WHERE id = ?',
            [title, date, category, id],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                    dispatch(taskEdited({
                        id: id,
                        finishDate: date,
                        category,
                        title
                    }))
                    navigation.navigate('Home')
                } else {
                    console.log('No task found with the specified id');
                }
            },
            (txObj, error) => console.log(error)
        );
    });
}

export const markDoneTaskByIdHelper = (task, dispatch) => {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE tasks SET status = "done" WHERE id = ?',
            [task],
            (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                    dispatch(taskDone(task))
                } else {
                    console.log('No task found with the specified id');
                }
            },
            (txObj, error) => console.log(error)
        );
    });
}

export const AddTaskHelper = (title, finishDate, category, dispatch, exitModal) => {
    const currentDate = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
    const status = 'todo'
    const date = finishDate.toISOString()
    db.transaction(tx => {
        tx.executeSql('INSERT INTO tasks (title, created, ending, status, category) VALUES (?, ?, ?, ?, ?)',
            [title, currentDate, date, status, category],
            (txObj, resultSet) => {
                const task = {
                    id: resultSet.insertId,
                    title: title,
                    created: currentDate,
                    ending: date,
                    status: status,
                    category: category
                }
                dispatch(taskAdded(task))
                exitModal(false);
            },
            (txObj, error) => console.log(error)
        )
    })
}

export const deleteTaskByIdHelper = (taskId, dispatch) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'DELETE FROM tasks WHERE id = ?',
                [taskId],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        dispatch(taskDeleted(taskId));
                    }
                },
                (txObj, error) => console.log(error)
            );
        }
    );
};