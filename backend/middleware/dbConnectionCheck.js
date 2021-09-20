import mongoose from "mongoose";
import colors from "colors";
const dbConnectionCheck = (req, res, next) => {
    const dbConnState = mongoose.connection.readyState;
    console.log("Checking connection to DB.".brightYellow);
    let stateTitle = "";
    switch (dbConnState) {
        case 0:
            stateTitle = "disconnected".red;
            break;
        case 1:
            stateTitle = "connected".green;
            break;
        case 2:
            stateTitle = "connecting".yellow;
            break;
        case 3:
            stateTitle = "disconnecting".red;
            break;
        default:
            stateTitle = "Not defined".gray;
    }
    console.log("Mongoose returned DB connection state: ".white + stateTitle);
    if (dbConnState !== 1) {
        res.status(503).send({
            dbConnectionFail: true,
            message: "Serverio jungtis su duomenų bazę nutrūko.",
        });
        return;
    }
    next();
};
export default dbConnectionCheck;
