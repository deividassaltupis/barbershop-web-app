export const addMinutesToTime = (currentTime, minutes) => {
    if (
        typeof currentTime.hour == "undefined" ||
        typeof currentTime.minute == "undefined"
    )
        return;
    const time = { ...currentTime };
    time.minute += minutes;
    while (time.minute >= 60) {
        time.minute -= 60;
        time.hour++;
    }
    return { hour: time.hour, minute: time.minute };
};
export const getDaysOfMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
