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
    serviceTitle: {
        type: String,
        required: true,
    },
    servicePrice: {
        type: Number,
        required: true,
    },
    timeSlots: [mongoose.Schema.Types.ObjectId],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    payMethod: {
        type: Number,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
    },
    visitStatus: {
        type: Number,
        required: true,
    },
});

export const Registration = mongoose.model(
    "Registration",
    registrationSchema,
    "registrations"
);
