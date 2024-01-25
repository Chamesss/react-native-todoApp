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
    insertTask: (title, created, ending, status, category, callback) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'INSERT INTO tasks (title, created, ending, status, category) VALUES (?, ?, ?, ?, ?)',
                    [title, created, ending, status, category],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) {
                            callback(insertId);
                        } else {
                            callback(null);
                        }
                    },
                    (error) => console.error(error)
                );
            },
            null,
            null
        );
    },

    getAllTasks: (callback) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM tasks',
                    [],
                    (_, { rows }) => {
                        callback(rows._array);
                    },
                    (error) => console.error(error)
                );
            },
            null,
            null
        );
    },

};

export default DatabaseHelper;