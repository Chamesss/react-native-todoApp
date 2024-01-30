export const TasksFilter = (tasks) => {
    const currentTime = new Date();
    const lateTasks = tasks.filter(task => {
        const taskEndingTime = new Date(task.ending);
        return taskEndingTime < currentTime && task.status === 'todo'
    })
    const finishedTasks = tasks.filter(task => task.status === 'done')
    const upcomingTasks = tasks.filter(task => {
        const taskEndingTime = new Date(task.ending);
        return taskEndingTime > currentTime && task.status === 'todo'
    })
    return { lateTasks, finishedTasks, upcomingTasks }
}