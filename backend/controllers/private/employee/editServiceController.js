import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Service } from "../../../models/Service.js";

const editServiceController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.params.serviceID)
        return res
            .status(400)
            .json({ error: true, message: "Paslaugos ID nenurodytas." });
    const serviceObj = req.body;
    const serviceID = req.params.serviceID;
    if (
        !serviceObj.title ||
        !serviceObj.timeSlots ||
        !serviceObj.price ||
        !serviceObj.iconID
    ) {
        return res.status(401).json({
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
    await Service.findOneAndUpdate({ _id: serviceID }, serviceObj);

    res.json({
        message: "Paslauga sėkmingai atnaujinta",
    });
};

export default editServiceController;
