
export const TimerSetter = (finishDate, selectedDate) => {
    const existingYear = finishDate.getFullYear();
    const existingMonth = finishDate.getMonth();
    const existingDay = finishDate.getDate();
    const newFinishDate = new Date(existingYear, existingMonth, existingDay, selectedDate.getHours() + 1, selectedDate.getMinutes(), 0, 0);
    const timeString = selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return { newFinishDate, timeString }
}

export const DateSetter = (finishDate, selectedDate) => {
    const existingHours = finishDate.getHours();
    const existingMinutes = finishDate.getMinutes();
    const newFinishDate = new Date(selectedDate);
    newFinishDate.setHours(existingHours, existingMinutes, 0, 0);
    return newFinishDate
}