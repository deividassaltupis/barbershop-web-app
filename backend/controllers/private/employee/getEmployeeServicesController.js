import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { User } from "../../../models/User.js";
import { Service } from "../../../models/Service.js";

const getEmployeeServicesController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    const userData = await User.findOne({ _id: req.user.userID });
    const userServicesRef = userData.serviceList;
    const serviceArray = [];
    for (const serviceRef of userServicesRef) {
        const serviceObj = (
            await Service.findOne({ _id: serviceRef.serviceID })
        )._doc;
        serviceObj.serviceAvailable = serviceRef.serviceAvailable;
        serviceArray.push(serviceObj);
    }
    res.json({ serviceArray: serviceArray });
};

export default getEmployeeServicesController;
