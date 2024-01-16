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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    return formattedDate
}