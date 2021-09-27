import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Schedule } from "../../../models/Schedule.js";
import { RegistrationTimeSlot } from "../../../models/RegistrationTimeSlot.js";
import { REG_TIME_SLOT_DURATION_IN_MINUTES } from "../../../utils/defines.js";

const getDaysOfMonth = (year, month) => new Date(year, month, 0).getDate();

const addMinutesToTime = (currentTime, minutes) => {
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

const addScheduleController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;

    // await Schedule.deleteMany();
    // await RegistrationTimeSlot.deleteMany();

    // return res.json({ message: "all deleted" });

    if (!req.body.schedule)
        return res.status(400).json({
            error: true,
            message: "Naujo grafiko duomenys į serverį negauti.",
        });
    const schedule = req.body.schedule;
    console.log(schedule);
    if (
        !schedule.scheduleType ||
        !schedule.workTimeStart ||
        !schedule.workTimeEnd ||
        !schedule.scheduleStartDate ||
        !schedule.scheduleEndDate
    )
        return res.status(400).json({
            error: true,
            message: "Trūksta reikiamų duomenų apie grafiką.",
        });

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    if (
        schedule.scheduleStartDate.year < currentYear ||
        (schedule.scheduleStartDate.year === currentYear &&
            schedule.scheduleStartDate.month < currentMonth) ||
        (schedule.scheduleStartDate.year === currentYear &&
            schedule.scheduleStartDate.month === currentMonth &&
            schedule.scheduleStartDate.day < currentDay)
    )
        return res.status(400).json({
            error: true,
            message:
                "Klaidingi grafiko parametrai. Grafiko įsigaliojimo data negali būti ankstesnė negu šios dienos data",
        });

    const scheduleStartDate = schedule.scheduleStartDate; // obj year, month, day
    const scheduleEndDate = schedule.scheduleEndDate; //obj year, month, day

    const startDate = new Date(
        scheduleStartDate.month +
            "/" +
            scheduleStartDate.day +
            "/" +
            scheduleStartDate.year
    );
    const endDate = new Date(
        scheduleEndDate.month +
            "/" +
            scheduleEndDate.day +
            "/" +
            scheduleEndDate.year
    );

    const weekLaterFromStartDate = new Date(startDate.getTime());
    weekLaterFromStartDate.setDate(weekLaterFromStartDate.getDate() + 7);
    if (weekLaterFromStartDate.getTime() > endDate.getTime()) {
        return res.status(401).json({
            error: true,
            message:
                "Grafiko trukmė negali būti trumpesnė negu viena savaitė (7 dienos).",
        });
    }
    const dateYearLater = new Date();
    dateYearLater.setFullYear(dateYearLater.getFullYear() + 1);
    if (dateYearLater.getTime() < startDate.getTime()) {
        return res.status(401).json({
            error: true,
            message:
                "Grafiko įsigaliojimo data negali būti vėlesnė negu vieneri metai",
        });
    }
    if (dateYearLater.getTime() < endDate.getTime()) {
        return res.status(401).json({
            error: true,
            message:
                "Grafiko pabaigos data negali būti vėlesnė ilgiau negu vieneri metai nuo šios dienos.",
        });
    }

    const userID = req.user.userID;

    const scheduleType = schedule.scheduleType;
    /*
    1 - selected week days
    2 - even days
    3 - odd days
    */

    const selectedWeekdays = schedule.selectedWeekdays; // array of numbers
    /* 
    0 - sunday
    1 - monday
    2 - tuesday
    3 - wednesday
    4 - thursday
    5 - friday
    6 - saturday
    */

    let workingDaysLabel = "";

    switch (scheduleType) {
        case 1:
            for (let dayNum of selectedWeekdays)
                switch (dayNum) {
                    case 0:
                        workingDaysLabel += "VII, ";
                        break;
                    case 1:
                        workingDaysLabel += "I, ";
                        break;
                    case 2:
                        workingDaysLabel += "II, ";
                        break;
                    case 3:
                        workingDaysLabel += "III, ";
                        break;
                    case 4:
                        workingDaysLabel += "IV, ";
                        break;
                    case 5:
                        workingDaysLabel += "V, ";
                        break;
                    case 6:
                        workingDaysLabel += "VI, ";
                        break;
                }
            break;
        case 2:
            workingDaysLabel = "Lyginės mėnesio dienos";
            break;
        case 3:
            workingDaysLabel = "Nelyginės mėnesio dienos";
            break;
    }
    workingDaysLabel = workingDaysLabel.trim().slice(0, -1);

    const wTimeStart = schedule.workTimeStart; // obj startHour, startMin
    const wTimeEnd = schedule.workTimeEnd; // obj endHour, endMin

    console.log(wTimeStart);
    console.log(wTimeEnd);

    const overridedTimeSlots = await RegistrationTimeSlot.deleteMany({
        "start.startYear": { $gte: parseInt(scheduleStartDate.year) },
        "start.startMonth": { $gte: parseInt(scheduleStartDate.month) },
        "start.startDay": { $gte: parseInt(scheduleStartDate.day) },
    });

    const workPeriods = [];
    const registrationSlots = [];

    for (
        let year = scheduleStartDate.year;
        year <= scheduleEndDate.year;
        year++
    ) {
        const endMonth =
            scheduleEndDate.year > year ? 12 : scheduleEndDate.month;
        const startMonth =
            scheduleStartDate.year < year ? 1 : scheduleStartDate.month;
        for (let month = startMonth; month <= endMonth; month++) {
            const newWorkPeriod = {
                year: year,
                month: month,
                days: [],
            };
            const daysOfMonth = getDaysOfMonth(year, month);
            let startDay = 1;
            let endDay = daysOfMonth;
            if (
                year === scheduleStartDate.year &&
                month === scheduleStartDate.month
            )
                startDay = scheduleStartDate.day;
            else if (
                year === scheduleEndDate.year &&
                month === scheduleEndDate.month
            )
                endDay = scheduleEndDate.day;
            switch (scheduleType) {
                case 1:
                    for (let day = startDay; day <= endDay; day++) {
                        const currentDate = new Date(year, month - 1, day);
                        const currentDayOfWeek = currentDate.getDay();
                        if (
                            selectedWeekdays.find(
                                (weekday) => weekday === currentDayOfWeek
                            )
                        )
                            newWorkPeriod.days.push(day);
                    }
                    break;
                case 2:
                    for (let day = startDay; day <= endDay; day++)
                        if (day % 2 === 0) newWorkPeriod.days.push(day);
                    break;
                case 3:
                    for (let day = startDay; day <= endDay; day++)
                        if (day % 2 !== 0) newWorkPeriod.days.push(day);
                    break;
            }
            workPeriods.push(newWorkPeriod);
            newWorkPeriod.days.forEach((day) => {
                let timeSlotStart = {
                    hour: wTimeStart.startHour,
                    minute: wTimeStart.startMin,
                };

                let timeSlotEnd = addMinutesToTime(
                    timeSlotStart,
                    REG_TIME_SLOT_DURATION_IN_MINUTES
                );
                while (timeSlotEnd.hour <= wTimeEnd.endHour) {
                    if (
                        timeSlotEnd.hour == wTimeEnd.endHour &&
                        timeSlotEnd.minute > wTimeEnd.endMin
                    )
                        break;
                    const regTimeSlot = {
                        scheduleID: null,
                        start: {
                            startYear: year,
                            startMonth: month,
                            startDay: day,
                            startHour: timeSlotStart.hour,
                            startMinute: timeSlotStart.minute,
                        },
                        end: {
                            endYear: year,
                            endMonth: month,
                            endDay: day,
                            endHour: timeSlotEnd.hour,
                            endMinute: timeSlotEnd.minute,
                        },
                        taken: false,
                    };
                    registrationSlots.push(regTimeSlot);
                    timeSlotStart = addMinutesToTime(
                        timeSlotStart,
                        REG_TIME_SLOT_DURATION_IN_MINUTES
                    );
                    timeSlotEnd = addMinutesToTime(
                        timeSlotStart,
                        REG_TIME_SLOT_DURATION_IN_MINUTES
                    );
                }
            });
        }
    }
    //scheduleStartDate.year

    const scheduleObj = new Schedule({
        employeeID: userID,
        workPeriods: workPeriods,
        workStartTime: {
            startHour: wTimeStart.startHour,
            startMinute: wTimeStart.startMin,
        },
        workEndTime: {
            endHour: wTimeEnd.endHour,
            endMinute: wTimeEnd.endMin,
        },
        startDate: new Date(
            startDate.getTime() +
                Math.abs(startDate.getTimezoneOffset() * 60000)
        ),
        endDate: new Date(
            endDate.getTime() + Math.abs(endDate.getTimezoneOffset() * 60000)
        ),
        workingDays: workingDaysLabel,
    });
    const createdSchedule = await scheduleObj.save();

    registrationSlots.forEach((slot, index, array) => {
        array[index].scheduleID = createdSchedule._id;
    });

    await RegistrationTimeSlot.insertMany(registrationSlots);
    res.json({
        message: "Schedule successfully created",
    });
};

export default addScheduleController;
