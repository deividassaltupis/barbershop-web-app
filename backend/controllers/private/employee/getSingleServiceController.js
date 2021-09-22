import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Service } from "../../../models/Service.js";

const getSingleServiceController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.params.serviceID)
        return res
            .status(400)
            .json({ error: true, message: "Paslaugos ID nenurodytas." });
    const serviceID = req.params.serviceID;
    const serviceObj = await Service.findOne({ _id: serviceID });
    res.json({ serviceObj: serviceObj });
};

export default getSingleServiceController;
