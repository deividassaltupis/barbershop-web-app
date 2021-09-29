import mongoose from "mongoose";

const timeSlotStartDate = mongoose.Schema({
    startYear: {
        type: Number,
        required: true,
    },
    startMonth: {
        type: Number,
        required: true,
    },
    startDay: {
        type: Number,
        required: true,
    },
    startHour: {
        type: Number,
        required: true,
    },
    startMinute: {
        type: Number,
        required: true,
    },
});
const timeSlotEndDate = mongoose.Schema({
    endYear: {
        type: Number,
        required: true,
    },
    endMonth: {
        type: Number,
        required: true,
    },
    endDay: {
        type: Number,
        required: true,
    },
    endHour: {
        type: Number,
        required: true,
    },
    endMinute: {
        type: Number,
        required: true,
    },
});

const registrationTimeSlotSchema = mongoose.Schema({
    scheduleID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    start: {
        type: timeSlotStartDate,
        required: true,
    },
    end: {
        type: timeSlotEndDate,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    taken: {
        type: Boolean,
        required: true,
    },
});

export const RegistrationTimeSlot = mongoose.model(
    "RegistrationTimeSlot",
    registrationTimeSlotSchema,
    "registrationTimeSlots"
);
