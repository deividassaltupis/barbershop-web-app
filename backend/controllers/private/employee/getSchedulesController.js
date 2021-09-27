import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Schedule } from "../../../models/Schedule.js";

const getSchedulesController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    const employeeSchedules = await Schedule.find({
        employeeID: req.user.userID,
    });
    res.json({
        schedules: employeeSchedules,
    });
};

export default getSchedulesController;
