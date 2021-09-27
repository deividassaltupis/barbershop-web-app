import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

// -- Controllers
// ---- Public controllers.
import loginController from "./controllers/public/loginController.js";
import verifyTokenController from "./controllers/public/verifyTokenController.js";
import getServicesController from "./controllers/public/getServicesController.js";

// ---- Private controllers. For all authentificated web app users (admins and employess)
import updateUserController from "./controllers/private/updateUserController.js";
import getUserController from "./controllers/private/getUserController.js";

// ---- Private controllers. For authorized web app administrators
import usersController from "./controllers/private/admin/usersController.js";
import addUserController from "./controllers/private/admin/addUserController.js";

// ---- Private controllers. For authorized web app employees.
import addServiceController from "./controllers/private/employee/addServiceController.js";
import addExistingServiceController from "./controllers/private/employee/addExistingServiceController.js";
import getEmployeeServicesController from "./controllers/private/employee/getEmployeeServicesController.js";
import editServiceController from "./controllers/private/employee/editServiceController.js";
import getSingleServiceController from "./controllers/private/employee/getSingleServiceController.js";

import addScheduleController from "./controllers/private/employee/addScheduleController.js";
import getSchedulesController from "./controllers/private/employee/getSchedulesController.js";
import deleteScheduleController from "./controllers/private/employee/deleteScheduleController.js";

// -- Middlewares
import authentification from "./middleware/authentification.js";
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

// - PUBLIC ROUTES

app.get("/", (req, res) => {
    return res.send("Server is running...");
});

app.post("/api/users/login/", loginController);

app.get("/api/users/verify_token/:token", verifyTokenController);

// * /api/users/add_registration/ - Mutual route for both visitors and employees to add new registrations.
//app.post("/api/users/add_registration/");

// -
app.get("/api/get_services_and_employees", (req, res) => {});

app.get("/api/get_free_registration_dates_and_times", (req, res) => {});

app.get("/api/services/", getServicesController);

// - AUTHENTIFICATION of user. If auth succeeds user will be allowed to access next routes.
app.use(authentification);

// - USER ROUTES (for both employees and admins)
app.get("/api/user/", getUserController);
app.put("/api/user/", updateUserController);

// - ADMIN ROUTES

app.get("/api/admin/get_users/", usersController);
app.post("/api/admin/add_user/", addUserController);

// - EMPLOYEE ROUTES

// --- Registrations

//app.get("/api/employee/get_registrations/");

//app.put("/api/employee/edit_registration/");

//app.delete("/api/employee/delete_registration/");

// --- Services

app.post("/api/employee/add_service/", addServiceController);
app.post("/api/employee/add_existing_service/", addExistingServiceController);
app.get("/api/employee/get_services/", getEmployeeServicesController);
app.get("/api/employee/get_service/:serviceID", getSingleServiceController);
app.put("/api/employee/update_service/:serviceID", editServiceController);

// --- Schedules

app.get("/api/employee/get_schedules/", getSchedulesController);
app.post("/api/employee/add_schedule/", addScheduleController);
app.delete(
    "/api/employee/delete_schedule/:scheduleID",
    deleteScheduleController
);
