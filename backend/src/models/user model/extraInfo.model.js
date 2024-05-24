import mongoose from 'mongoose';

const extraInfoSchema = new mongoose.Schema(
    {
        bio : {
            type: String, 
            trim: true,
        },
        otherName: {
            type: String,
            trim: true,
        },
        job: {
            type: String,
            trim: true,
        }, 
        workPlace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        },
        highSchool: {
            type: String,
            trim: true,
        },
        college: {
            type: String, 
            trim: true,
        }, 
        currentCity: {
            type: String,
            trim: true,
        }, 
        hometown: {
            type: String,
            trim: true,
        },
        relnStatus: {
            type: String,
            enum: ["Married", "Mingle", "Single", "kat gaya"], 
            default: "kat gaya"
        }       

    }, 
    {
        timestamps: true,
    }
);

const ExtraInfo = new mongoose.model("ExtraInfo", extraInfoSchema);
export default ExtraInfo;