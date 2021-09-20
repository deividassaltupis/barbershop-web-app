import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,
        required: false,
    },
    timeSlots: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export const Service = mongoose.model("Service", serviceSchema, "services");
