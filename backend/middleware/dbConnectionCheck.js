import mongoose from "mongoose";
const dbConnectionCheck = (req, res, next) => {
    console.log("checking connection");
    if (mongoose.connection.readyState !== 1) {
        res.status(503).send({
            dbConnectionFail: true,
            message: "Server connection to database failed.",
        });
        return;
    }
    next();
};
export default dbConnectionCheck;
