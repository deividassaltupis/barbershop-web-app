import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Service } from "../../../models/Service.js";
import { User } from "../../../models/User.js";

const addServiceController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    const serviceObj = req.body;
    if (
        !serviceObj.title ||
        !serviceObj.timeSlots ||
        !serviceObj.price ||
        !serviceObj.iconID
    ) {
        return res.status(400).json({
            error: true,
            message:
                "Būtinų nurodyti visus prašomus duomenis apie pridedamą paslaugą.",
        });
    }
    switch (serviceObj.timeSlots) {
        case 1:
            serviceObj.duration = "30 min";
            break;
        case 2:
            serviceObj.duration = "60 min";
            break;
        case 3:
            serviceObj.duration = "1h 30 min";
            break;
        case 4:
            serviceObj.duration = "2h 00 min";
            break;
    }
    const createdService = await new Service(serviceObj).save();

    const userData = await User.findOne({ _id: req.user.userID });

    userData.serviceList.push({
        serviceID: createdService._id,
        serviceAvailable: true,
    });

    await userData.save();

    res.json({
        message:
            "Paslauga pridėta. Paslaugas galite peržiūrėti savo teikiamų paslaugų sąraše",
    });
};

export default addServiceController;
