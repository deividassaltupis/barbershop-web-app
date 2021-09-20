import { TOKEN_SECRET_KEY } from "../app.js";

const userVerification = (req, res, next) => {
    console.log("verifying");
    let token = req.headers["authorization"];
    console.log("token: " + token);
    if (!token) return next();

    token = token.replace("Bearer ", "");
    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user.",
            });
        } else {
            req.user = user;
            next();
        }
    });
};

export default userVerification;
