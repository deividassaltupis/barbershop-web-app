import { Service } from "../../models/Service.js";
const getServicesController = async (req, res) => {
    const servicesArr = await Service.find();
    res.json({ servicesArr: servicesArr });
};
export default getServicesController;
