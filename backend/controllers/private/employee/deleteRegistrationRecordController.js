import employeeAuthorization from "../../../middleware/employeeAuthorization.js";
import { Registration } from "../../../models/Registration.js";

const deleteRegistrationRecordController = async (req, res) => {
    if (!employeeAuthorization(req, res)) return;
    if (!req.params.regID) {
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    }
    const regID = req.params.regID;
    const registration = await Registration.findOneAndDelete({ _id: regID });
    if (!registration)
        return res.status(401).json({
            error: true,
            message:
                "Įvyko klaida. Pasirinkta registracija nerasta duomenų bazėje.",
        });

    res.json({
        message: "Registracijos įrašas sėkmingai panaikintas.",
    });
};

export default deleteRegistrationRecordController;
