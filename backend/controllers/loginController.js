import { User } from "../models/User.js";
import { PASSWORD_SECRET_KEY } from "../app.js";
import crypto from "crypto";
import { generateToken, getCleanUser } from "../utils/auth.js";

const loginController = async (req, res) => {
    console.log("login attempt");
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            error: true,
            message: "Username and password are required",
        });
    }
    const hashedPassword = crypto
        .createHmac("sha256", PASSWORD_SECRET_KEY)
        .update(password)
        .digest("hex");

    const user = await User.findOne({ username: username });
    if (!user)
        return res.status(401).json({
            error: true,
            message: "User name or password is incorrect",
        });
    if (user.password !== hashedPassword)
        return res.status(401).json({
            error: true,
            message: "User name or password is incorrect",
        });

    const token = generateToken(user);
    const cleanUser = getCleanUser(user);

    return res.json({ user: cleanUser, token });
};

export default loginController;
