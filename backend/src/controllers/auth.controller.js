import User from "../models/user model/user.model.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import sendError from "../utils/formatError.utils.js";
import sendResponse from "../utils/formatResponse.utils.js";

export const registerUser = asyncHandler(async (req, res, next)=>{
    const { fullName, username, email, phone, password, gender, dateOfBirth } = req.body;
    if(
        [fullName, username, email, phone, password, gender, dateOfBirth].some(field=>field?.trim() ? 0 : 1)
    ){
        throw new sendError(206, "All fields are necessary!");
    }
    
    await User.create(
        req.body,
    )
    .then((savedUser)=>{
        res
        .status(200)
        .json(
            new sendResponse(200, "User Registration Successfull", savedUser)
        );
    })
    .catch(err=>next(err));
})