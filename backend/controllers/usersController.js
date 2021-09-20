import { User } from "../models/User.js";

const usersController = async (req, res) => {
    const userArray = await User.find();
    res.json(userArray);
};

export default usersController;
