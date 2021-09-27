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
    workEndTime: {
        endHour: {
            type: Number,
            required: true,
        },
        endMinute: {
            type: Number,
            required: true,
        },
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    workingDays: {
        type: String,
        required: false,
    },
});

export const Schedule = mongoose.model("Schedule", scheduleSchema, "schedules");
