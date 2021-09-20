import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    workPeriods: [
        {
            year: {
                type: Number,
                required: true,
            },
            month: {
                type: Number,
                required: true,
            },
            days: [Number],
        },
    ],
    workStartTime: {
        startHour: {
            type: Number,
            required: true,
        },
        startMinute: {
            type: Number,
            required: true,
        },
    },
    workdEndTime: {
        endHour: {
            type: Number,
            required: true,
        },
        endMinute: {
            type: Number,
            required: true,
        },
    },
});

export const Schedule = mongoose.model("Schedule", scheduleSchema, "schedules");
