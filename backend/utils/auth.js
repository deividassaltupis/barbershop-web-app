import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../app.js";

const generateToken = (user) => {
    if (!user) return null;
    const tokenUserObj = {
        userID: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
    };

    return jwt.sign(tokenUserObj, TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
    });
};

const getCleanUser = (user) => {
    if (!user) return null;
    const cleanUserObj = { ...user._doc };
    delete cleanUserObj.password;
    return cleanUserObj;
};

export { generateToken, getCleanUser };
