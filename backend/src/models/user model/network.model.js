import mongoose, { mongo } from 'mongoose';

const networkSchema = new mongoose.Schema(
    {
        friends: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        followings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        followers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        requests: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        recentSearch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Network = new mongoose.model("Network", networkSchema);
export default Network;