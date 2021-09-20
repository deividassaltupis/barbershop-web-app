import { TOKEN_SECRET_KEY } from "../app.js";
import Jwt from "jsonwebtoken";

const authentification = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token)
        return res.status(401).json({
            error: true,
            message:
                "Užklausos maršrutas prieinamas tik autentifikuotiems vartotojams.",
        });

    token = token.replace("Bearer ", "");
    Jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message:
                    "Užklausos maršrutas prieinamas tik autentifikuotiems vartotojams.",
            });
        } else {
            req.user = user;
            next();
        }
    });
};

export default authentification;
