import User from "../models/user model/user.model.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import errorPacket from "../utils/formatError.utils.js";
import responsePacket from "../utils/formatResponse.utils.js";
import { validateEmail } from "../validators/email.validator.js";

export const registerUser = asyncHandler(async (req, res, next)=>{
    const { fullName, username, email, phone, password, gender, dateOfBirth } = req.body;
    if(
        [fullName, username, email, phone, password, gender, dateOfBirth].some(field=>field?.trim() ? 0 : 1)
    ){
        throw new errorPacket(206, "All fields are necessary!");
    }

    if(!validateEmail(email)){
        throw new MongoAPIError()
    }
    
    await User.create(
        req.body,
    )
    .then((savedUser)=>{
        res
        .status(200)
        .json(
            new responsePacket(200, "User Registration Successfull", savedUser)
        );
    })
    .catch(err=>next(err));
})