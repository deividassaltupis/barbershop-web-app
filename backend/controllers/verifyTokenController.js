//import jwt from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { getCleanUser } from "../utils/auth.js";
import { TOKEN_SECRET_KEY } from "../app.js";

const verifyTokenController = async (req, res) => {
    const token = req.body.token || req.params.token;
    if (!token)
        return res.status(400).json({
            error: true,
            message: "Token is required",
        });

    // const jwtVerify = Promise(Jwt.verify);

    // const user = await jwtVerify(token, TOKEN_SECRET_KEY)
    //     .then((user) => user)
    //     .catch((err) =>
    //         res.status(401).json({
    //             error: true,
    //             message: "Invalid token",
    //         })
    //     );

    // const userObj = await User.find({ _id: user.userID });
    // if (!userObj)
    //     return res.status(401).json({
    //         error: true,
    //         message: "Invalid user",
    //     });
    // const cleanUserObj = getCleanUser(userObj);
    // return res.json({ user: cleanUserObj, token });

    const tokenUserObj = await Jwt.verify(
        token,
        TOKEN_SECRET_KEY,
        (err, user) => {
            if (err)
                return res.status(401).json({
                    error: true,
                    message: "Invalid token",
                });
            return user;
        }
    );
    const userObj = await User.findOne({ _id: tokenUserObj.userID });
    if (!userObj)
        return res.status(401).json({
            error: true,
            message: "Invalid user",
        });
    const cleanUserObj = getCleanUser(userObj);
    return res.json({ user: cleanUserObj, token: token });
};

export default verifyTokenController;
