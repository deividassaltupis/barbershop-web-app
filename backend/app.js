import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

// -- Controllers
import usersController from "./controllers/usersController.js";
import loginController from "./controllers/loginController.js";
import verifyTokenController from "./controllers/verifyTokenController.js";
import addUserController from "./controllers/addUserController.js";

// -- Middlewares
import accessVerification from "./middleware/accessVerification.js";
import dbConnectionCheck from "./middleware/dbConnectionCheck.js";

// --- dotenv Configuration && environment variables
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
export const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY;

const app = express();
// ---
app.use(
    cors()
    //     {
    //     origin: "http://127.0.0.1:5501",
    // }
);
// --- express build-in middleware function for incoming requests with JSON payload parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`.bgCyan.black);
    mongoose
        .connect(MONGODB_URI)
        .then((res) => {
            console.log(
                `Successfully connected to ${res.connection.name}`.bgGreen.black
            );
        })
        .catch((error) => {
            console.log(error);
        });
});

app.use(dbConnectionCheck);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use(accessVerification);

app.post("/api/users/login/", loginController);

app.get("/api/users/verify_token/:token", verifyTokenController);

app.get("/api/users/", usersController);

app.post("/api/users/", addUserController);
