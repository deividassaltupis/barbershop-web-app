import { User } from "../models/User.js";
import adminAuthorization from "../middleware/adminAuthorization.js";

const usersController = async (req, res) => {
    if (!adminAuthorization(req, res)) return;

    const userArray = await User.find();
    res.json(userArray);
};

export default usersController;
