import { RegistrationTimeSlot } from "../../models/RegistrationTimeSlot.js";
import { User } from "../../models/User.js";
import { Service } from "../../models/Service.js";
import { addMinutesToTime } from "../../utils/time.js";

const getFreeRegistrationDatesAndTimes = async (req, res) => {
    if (!req.body.employeeID || !req.body.serviceID)
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai.",
        });
    const employee = await User.findOne({ _id: req.body.employeeID });
    const service = await Service.findOne({ _id: req.body.serviceID });

    if (!employee || !service)
        return res.status(401).json({
            error: true,
            message:
                "Įvyko klaida. Duomenys apie darbuotoją, arba paslaugą nerasti.",
        });

    if (
        !employee.serviceList.find(
            (eService) =>
                eService.serviceID == service._id && eService.serviceAvailable
        )
    )
        return res.status(401).json({
            error: true,
            message: "Pasirinktas darbuotojas neteikia nurodytos paslaugos.",
        });
    // - Free registration times will be search from current date up to date 3 months later.
    let searchStartDate = new Date();
    let searchEndDate = new Date();
    searchEndDate.setMonth(searchEndDate.getMonth() + 3);

    // searchStartDate = new Date(
    //     searchStartDate.getTime() +
    //         Math.abs(searchStartDate.getTimezoneOffset() * 60000)
    // );
    // searchEndDate = new Date(
    //     searchEndDate.getTime() +
    //         Math.abs(searchEndDate.getTimezoneOffset() * 60000)
    // );

    console.log(searchStartDate);
    console.log(searchEndDate);

    const registrationSlots = await RegistrationTimeSlot.find({
        startDate: {
            $gte: searchStartDate.getTime(),
            $lte: searchEndDate.getTime(),
        },
        employeeID: employee._id,
        taken: false,
    });
    const requiredSlots = service.timeSlots;
    const freeDatesAndTimes = [];
    registrationSlots.forEach((slot, index, array) => {
        let slotStartTime = {
            hour: slot.start.startHour,
            minute: slot.start.startMinute,
        };
        const slotIDs = [];
        let lastSlotEndDate = slot.endDate;
        slotIDs.push(slot._id);
        for (let i = 0; i < requiredSlots - 1; i++) {
            slotStartTime = addMinutesToTime(slotStartTime, 30);
            const nextSlot = array.find(
                (nextSlot) =>
                    nextSlot.start.startYear == slot.start.startYear &&
                    nextSlot.start.startMonth == slot.start.startMonth &&
                    nextSlot.start.startDay == slot.start.startDay &&
                    nextSlot.start.startHour == slotStartTime.hour &&
                    nextSlot.start.startMinute == slotStartTime.minute
            );
            if (nextSlot) {
                slotIDs.push(nextSlot._id);
                lastSlotEndDate = nextSlot.endDate;
            }
        }
        if (slotIDs.length == requiredSlots) {
            freeDatesAndTimes.push({
                slotIDs: slotIDs,
                startDate: slot.startDate,
                endDate: lastSlotEndDate,
            });
            let copyIDs = [...slotIDs];
            copyIDs.shift();
            copyIDs.forEach((sID) => {
                const index = array.findIndex(
                    (slotToSlice) => slotToSlice._id == sID
                );
                array.splice(index, 1);
            });
        }
    });
    res.json({ freeDatesAndTimes });
};

export default getFreeRegistrationDatesAndTimes;
