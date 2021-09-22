import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    iconID: {
        type: String,
        required: true,
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
