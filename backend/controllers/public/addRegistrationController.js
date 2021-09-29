import { Service } from "../../models/Service.js";
import { User } from "../../models/User.js";
import { Registration } from "../../models/Registration.js";
import { RegistrationTimeSlot } from "../../models/RegistrationTimeSlot.js";

const addRegistrationController = async (req, res) => {
    console.log(req.body);
    if (
        !req.body.customer ||
        !req.body.employeeID ||
        !req.body.serviceID ||
        !req.body.timeSlots
    ) {
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    }
    if (
        !req.body.customer.name ||
        !req.body.customer.surname ||
        !req.body.customer.email ||
        !req.body.customer.phone
    ) {
        return res.status(400).json({
            error: true,
            message: "Klaidingi parametrai",
        });
    }
    const customer = req.body.customer;
    const employeeID = req.body.employeeID;
    const serviceID = req.body.serviceID;
    const timeSlotIDs = req.body.timeSlots;

    const employee = await User.findOne({ _id: employeeID });
    const service = await Service.findOne({ _id: serviceID });
    if (!employee || !service)
        return res.status(401).json({
            error: true,
            message:
                "Įvyko klaida. Nepavyko gauti duomenis apie darbuotoją, arba paslaugą",
        });

    const timeSlots = [];
    for (let slotID of timeSlotIDs) {
        const timeSlot = await RegistrationTimeSlot.findOne({ _id: slotID });
        if (!timeSlot)
            return res.status(401).json({
                error: true,
                message:
                    "Įvyko klaida. Nepavyko pateikti registracijos pasirinktam laikui. Pabandykite pasirinkti kitą laiką.",
            });
        timeSlots.push(timeSlot);
    }
    const startDate = new Date(timeSlots[0].startDate);
    const endDate = new Date(timeSlots[timeSlots.length - 1].endDate);

    const registration = new Registration({
        customer: customer,
        employeeID: employeeID,
        serviceID: serviceID,
        serviceTitle: service.title,
        servicePrice: service.price,
        timeSlots: timeSlotIDs,
        startDate: startDate,
        endDate: endDate,
        payMethod: 0,
        paid: false,
        visitStatus: 0,
    });
    await registration.save();
    for (let slotID of timeSlotIDs) {
        await RegistrationTimeSlot.findOneAndUpdate(
            { _id: slotID },
            { taken: true }
        );
    }

    res.json({
        customer,
        employeeName: employee.name,
        serviceTitle: service.title,
        servicePrice: service.price,
        startDate,
        endDate,
        payMethod: registration.payMethod,
    });
};

export default addRegistrationController;
