import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('storage.db');

db.transaction((tx) => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT,
       created TEXT,
       ending TEXT,
       status TEXT,
       category TEXT
     );`
    );
});

const DatabaseHelper = {
    insertTask: ({ title, created, ending, status, category }) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        'INSERT INTO tasks (title, created, ending, status, category) VALUES (?, ?, ?, ?, ?)',
                        [title, created, ending, status, category],
                        (_, { rowsAffected, insertId }) => {
                            console.log('Insert ID:', insertId);
                            if (rowsAffected > 0) {
                                resolve(insertId);
                            } else {
                                reject(new Error('Failed to insert task.'));
                            }
                        },
                        (error) => {
                            console.error('Error executing SQL:', error);
                            reject(error);
                        }
                    );
                },
                null,
                null
            );
        });
    },

    getAllTasks: async () => {
        try {
            console.log('Fetching tasks...');  // displayed
            let tasks = await new Promise((resolve, reject) => {
                db.transaction(
                    (tx) => {
                        console.log('aaaaa')
                        tx.executeSql(
                            'SELECT * FROM tasks',
                            [],
                            (_, { rows }) => {
                                console.log('Tasks fetched successfully.');  // didnt get displayed
                                resolve(rows._array);
                            },
                            (error) => {
                                console.error('Error executing SQL:', error);
                                reject(error);
                            }
                        );
                    },
                    null,
                    null
                );
            });
            if (tasks.length === 0) {
                console.log('No tasks found.');
                // handle the case when tasks array is empty
            }
            return tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

};

export default DatabaseHelper;