import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: false,
        },
        surnamePublic: {
            type: Boolean,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
        summary: {
            type: String,
            required: false,
        },
        serviceList: [
            {
                serviceID: {
                    type: String,
                    required: false,
                },
                serviceAvailable: {
                    type: Boolean,
                    required: false,
                },
            },
        ],
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema, "users");
