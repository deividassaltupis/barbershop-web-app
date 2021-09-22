import { User } from "../../../models/User.js";
import { PASSWORD_SECRET_KEY } from "../../../app.js";
import crypto from "crypto";
import { ADMIN_ROLE, EMPLOYEE_ROLE } from "../../../utils/defines.js";
import { getCleanUser } from "../../../utils/auth.js";
import adminAuthorization from "../../../middleware/adminAuthorization.js";

const addUserController = async (req, res) => {
    if (!adminAuthorization(req, res)) return;

    const user = req.body.user;
    if (
        !user.username ||
        !user.name ||
        !user.email ||
        !user.password ||
        !user.phone ||
        !user.role
    ) {
        return res.status(400).json({
            error: true,
            message: "Trūksta būtinų duomenų apie naują vartotojo paskyrą",
        });
    }

    if (user.role !== ADMIN_ROLE && user.role !== EMPLOYEE_ROLE)
        return res.json(401).json({
            error: true,
            message:
                "Naujo vartotojo rolė neteisingai nurodyta. Galimos rolės: Admin, Employee",
        });

    const hashedPassword = crypto
        .createHmac("sha256", PASSWORD_SECRET_KEY)
        .update(user.password)
        .digest("hex");

    user.password = hashedPassword;
    const newUser = new User(user);
    const createdUser = await newUser.save();
    if (createdUser) {
        const cleanUser = getCleanUser(createdUser);
        res.json({
            user: cleanUser,
        });
    } else
        res.status(401).json({
            error: true,
            message:
                "Nepavyko sukurti naują vartotoją. Įvyko klaida serveryje.",
        });
};

export default addUserController;
