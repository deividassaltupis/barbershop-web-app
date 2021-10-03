import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Registration } from "../../../models/Registration.js";
import { RegistrationTimeSlot } from "../../../models/RegistrationTimeSlot.js";

const changeRegistrationDateTimeController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.body.regID || !req.body.slotIDs) {
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    }
    const regID = req.body.regID;
    const slotIDs = req.body.slotIDs;
    console.log(slotIDs);
    const registration = await Registration.findOne({ _id: regID });
    if (!registration)
        return res.status(401).json({
            error: true,
            message: "Registracija nerasta",
        });
    const timeSlots = [];
    for (let slotID of slotIDs) {
        timeSlots.push(await RegistrationTimeSlot.findOne({ _id: slotID }));
    }
    if (timeSlots.length < registration.timeSlots.length)
        return res.status(401).json({
            error: true,
            message:
                "Įvyko klaida. Registracijai parinktas naujas laikas nepakankamas.",
        });
    const currentTimeSlotIDs = registration.timeSlots;
    for (let slotID of currentTimeSlotIDs) {
        await RegistrationTimeSlot.findOneAndUpdate(
            { _id: slotID },
            { taken: false }
        );
    }
    for (let timeSlot of timeSlots) {
        timeSlot.taken = true;
        await timeSlot.save();
    }
    registration.timeSlots = slotIDs;
    const startDate = new Date(timeSlots[0].startDate);
    const endDate = new Date(timeSlots[timeSlots.length - 1].endDate);
    registration.startDate = startDate;
    registration.endDate = endDate;
    await registration.save();
    res.json({
        error: false,
        message: "Vizito laikas sėkmingai atnaujintas",
    });
};

export default changeRegistrationDateTimeController;
