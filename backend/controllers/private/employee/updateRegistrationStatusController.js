import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Registration } from "../../../models/Registration.js";

const updateRegistrationStatusController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.body.regID || !req.body.fulfilled) {
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    }
    const regID = req.body.regID;
    const fulfillValue = parseInt(req.body.fulfilled);
    if (fulfillValue !== 1 && fulfillValue !== 2)
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    await Registration.findOneAndUpdate(
        { _id: regID },
        { visitStatus: fulfillValue }
    );
    res.json({ message: "Registracijos statusas atnaujintas." });
};

export default updateRegistrationStatusController;
