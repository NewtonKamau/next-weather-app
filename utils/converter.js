export const converter = (inputDate) => {
    //an array of the days of the week 
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //format input date
    const date = new Date(inputDate);
    //access of number from 0-6 which represent days
    const weekdayIndex = date.getDay()
    return weekdays[weekdayIndex];

}