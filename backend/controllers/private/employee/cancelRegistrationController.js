import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Registration } from "../../../models/Registration.js";
import { RegistrationTimeSlot } from "../../../models/RegistrationTimeSlot.js";

const cancelRegistrationController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.params.regID) {
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    }
    const regID = req.params.regID;
    const registration = await Registration.findOne({ _id: regID });
    if (!registration)
        return res.status(401).json({
            error: true,
            message:
                "Įvyko klaida. Pasirinkta registracija nerasta duomenų bazėje.",
        });

    const regSlotIDs = registration.timeSlots;
    for (let slotID of regSlotIDs) {
        await RegistrationTimeSlot.findOneAndUpdate(
            { _id: slotID },
            { taken: false }
        );
    }
    await registration.remove();
    res.json({
        message: "Registracija sėkmingai panaikinta.",
    });
};

export default cancelRegistrationController;
