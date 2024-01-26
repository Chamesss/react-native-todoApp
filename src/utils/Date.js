export const getFormattedDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long', // Full month name
        day: 'numeric', // Day of the month
        year: 'numeric', // Full year
    });

    return formattedDate
};

export const getFormattedDateWithName = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', // Full day name
        month: 'long',  // Full month name
        day: 'numeric',  // Day of the month
        year: 'numeric', // Full year
    });

    return formattedDate;
};

export const getDateHours = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const defaultTime = now.toLocaleTimeString('en-US', options);
    return defaultTime
}