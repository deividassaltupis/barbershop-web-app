import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Schedule } from "../../../models/Schedule.js";
import { RegistrationTimeSlot } from "../../../models/RegistrationTimeSlot.js";

const deleteScheduleController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;

    if (!req.params.scheduleID)
        return res.status(400).json({
            error: true,
            message: "Grafiko ID parametras nenurodytas",
        });

    const deletedSchedule = await Schedule.findOneAndDelete({
        employeeID: req.user.userID,
        _id: req.params.scheduleID,
    });
    await RegistrationTimeSlot.deleteMany({
        scheduleID: req.params.scheduleID,
    });

    if (deletedSchedule)
        res.json({
            message: "Grafikas sėkmingai panaikintas",
        });
    else
        res.status(401).json({
            error: true,
            message: "Grafikas nerastas duomenų bazėje",
        });
};

export default deleteScheduleController;
