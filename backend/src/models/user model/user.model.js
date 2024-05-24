import mongoose, { mongo } from 'mongoose';
import { type } from 'os';
const userSchema = new mongoose.Schema(
    {
        fName : {
            type: String, 
            required: [true, "First Name is required"],
            trim: true,
            maxlength: 40,
        },
        lName: {
            type: String,
            trim: true,
        },
        username: {
            type: String,
            require: [true, "Username is required"],
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        }, 
        email: {
            type: String,
            require: [true, "E-mail is required"],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: [true, "Password is required"],
            trim: true,
        },
        profilePhoto: {
            type: String,
            default: "http://creativeartsworkshop.org/wp-content/uploads/2020/02/blank-profile-picture-973460_960_720-300x300-1-300x300.png"
        },
        coverPhoto: {
            type: String,
            default: "http://creativeartsworkshop.org/wp-content/uploads/2020/02/blank-profile-picture-973460_960_720-300x300-1-300x300.png"
        },
        gender: {
            type: String, 
            enum: ["M", "F", "Prefer not to say!"],
            default: "prefer not to say!",
        },
        dateOfBirth: {
            type: Date,
            require: [true, "DOB is required"],
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        networks: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Network",
        },
        extraInfo: {
            type: mongoose.Schema.types.ObjectId,
            ref: "ExtraInfo"
        },
    }, 
    {
        timestamps: true,
    }
);

const User = new mongoose.model("User", userSchema);
export default User;