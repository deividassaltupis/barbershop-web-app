import { User } from "../../models/User.js";
const updateUserController = async (req, res) => {
    if (!req.body.user)
        return res.status(400).json({
            error: true,
            message:
                "Nėra nurodyta jokių vartotojo duomenų, kurios norima atnaujinti.",
        });
    const dataUpdate = req.body.user;
    const userID = req.user.userID;
    await User.findOneAndUpdate({ _id: userID }, dataUpdate);
    res.json({ message: "Vartotojo duomenys atnaujinti" });
};
export default updateUserController;
