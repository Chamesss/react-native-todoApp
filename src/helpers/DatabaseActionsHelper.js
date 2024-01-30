import { taskEdited, taskAdded } from "../slices/tasksSlice";

export const EditTaskHelper = (db, title, date, category, id, dispatch, navigation) => {
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

export const AddTaskHelper = (db, title, finishDate, category, dispatch, exitModal) => {
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