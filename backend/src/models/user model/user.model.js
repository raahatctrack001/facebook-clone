import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        fullName : {
            type: String, 
            required: [true, "First Name is required"],
            trim: true,
            maxlength: [40, "Max character should not exceed 50 character"],
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
        phone: {
            type: String,
            trim: true,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExtraInfo"
        },
        emailLinkedAccount: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        phoneLinkedAccount: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }]
    }, 
    {
        timestamps: true,
    }
);

const User = new mongoose.model("User", userSchema);
export default User;