import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        fullName : {
            type: String, 
            required: [true, "First Name is required"],
            trim: true,
            maxlength: [50, "Max character should not exceed 50 character"],
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
            select: true,
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
        }],
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcryptjs.hashSync(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcryptjs.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateVerificationToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.VERIFICATION_TOKEN_SECRET,
        {
            expiresIn: 30*60*1000,
        }
    )
}

const User = new mongoose.model("User", userSchema);
export default User;