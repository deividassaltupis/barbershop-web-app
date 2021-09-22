import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { User } from "../../../models/User.js";

const addExistingServiceController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.body.serviceID)
        return res.status(400).json({
            error: true,
            message: "Paslaugos ID nenurodytas.",
        });
    const userID = req.user.userID;
    const serviceID = req.body.serviceID;
    const userObj = await User.findOne({ _id: userID });
    userObj.serviceList.push({ serviceID: serviceID, serviceAvailable: true });
    await userObj.save();

    res.json({ message: "Paslauga sėkmingai pridėta" });
};

export default addExistingServiceController;
