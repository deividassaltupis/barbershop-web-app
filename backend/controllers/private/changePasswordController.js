import { User } from "../../models/User.js";
import { PASSWORD_SECRET_KEY } from "../../app.js";
import crypto from "crypto";

const changePasswordController = async (req, res) => {
    if (!req.body.password || !req.body.newPassword)
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });

    const userID = req.user.userID;
    const currentPassword = req.body.password;
    const newPassword = req.body.newPassword;

    const hashedPassword = crypto
        .createHmac("sha256", PASSWORD_SECRET_KEY)
        .update(currentPassword)
        .digest("hex");

    const user = await User.findOne({ _id: userID });
    if (!user)
        return res.status(401).json({
            error: true,
            message: "Įvyko klaida. Vartotojo duomenys duomenų bazėje nerasti.",
        });
    if (user.password !== hashedPassword)
        return res.status(401).json({
            error: true,
            message: "Dabartinis slaptažodis neteisingas.",
        });

    const hashedNewPassword = crypto
        .createHmac("sha256", PASSWORD_SECRET_KEY)
        .update(newPassword)
        .digest("hex");

    user.password = hashedNewPassword;
    await user.save();
    res.json({
        message: "Slaptažodis sėkmingai atnaujintas",
    });
};

export default changePasswordController;
