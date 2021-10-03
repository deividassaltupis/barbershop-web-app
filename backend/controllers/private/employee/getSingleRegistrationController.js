import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Registration } from "../../../models/Registration.js";

const getSingleRegistrationController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.params.id)
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    const regID = req.params.id;
    const employeeID = req.user.userID;
    const registration = await Registration.findOne({
        _id: regID,
        employeeID: employeeID,
    });
    if (!registration)
        return res.status(401).json({
            error: true,
            message: "Registracija nerasta.",
        });
    res.json({ registration });
};

export default getSingleRegistrationController;
