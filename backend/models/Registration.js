import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    timeSlots: [mongoose.Schema.Types.ObjectId],
    dateAndTime: {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
        hour: {
            type: Number,
            required: true,
        },
        minute: {
            type: Number,
            required: true,
        },
    },
    payMethod: {
        type: Number,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
    },
});

export const Registration = mongoose.model(
    "Registration",
    registrationSchema,
    "registrations"
);
