//import jwt from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import { getCleanUser } from "../../utils/auth.js";
import { TOKEN_SECRET_KEY } from "../../app.js";

const verifyTokenController = async (req, res) => {
    const token = req.body.token || req.params.token;
    if (!token)
        return res.status(400).json({
            error: true,
            message: "Vartotojo autentifikacija nepavyko",
        });

    const tokenUserObj = await Jwt.verify(
        token,
        TOKEN_SECRET_KEY,
        (err, user) => {
            if (err)
                return res.status(401).json({
                    error: true,
                    message: "Vartotojo autentifikacija nepavyko",
                });
            return user;
        }
    );
    const userObj = await User.findOne({ _id: tokenUserObj.userID });
    if (!userObj)
        return res.status(401).json({
            error: true,
            message: "Duomenys apie vartotoją duomenų bazėje nerasti",
        });
    const cleanUserObj = getCleanUser(userObj);
    return res.json({ user: cleanUserObj, token: token });
};

export default verifyTokenController;
