import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Registration } from "../../../models/Registration.js";

const getRegistrationsController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;

    if (!req.body.startDate || !req.body.endDate)
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });

    const dateFilter = req.body;

    const startDate = new Date(dateFilter.startDate);
    const endDate = new Date(dateFilter.endDate);

    const regArr = await Registration.find({
        startDate: {
            $gte: startDate.getTime(),
            $lte: endDate.getTime(),
        },
        employeeID: req.user.userID,
    });
    res.json({ regArr });
};

export default getRegistrationsController;
