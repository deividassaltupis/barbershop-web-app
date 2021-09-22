import { User } from "../../models/User.js";

const getUserController = async (req, res) => {
    res.json(await User.findOne({ _id: req.user.userID }));
};
export default getUserController;
