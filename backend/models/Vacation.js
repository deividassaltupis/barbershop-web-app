import mongoose from "mongoose";

const vacationSchema = mongoose.Schema(
    {
        employeeID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        startDate: {
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
        },
        endDate: {
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
        },
    },
    { timestamps: true }
);

export const Vacation = mongoose.model("Vacation", vacationSchema, "vacations");
