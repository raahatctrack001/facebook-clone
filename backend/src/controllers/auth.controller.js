import User from "../models/user model/user.model.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import errorPacket from "../utils/formatError.utils.js";
import responsePacket from "../utils/formatResponse.utils.js";
import { validateEmail } from "../validators/validator.js";


const generateAccessAndRefreshToken = async(userId) => {
    try{
        const currentUser = await User.findById(userId); //whenever there's a communication between data base ASYNC AWAIT is mendatory otherwise you will end up your whole day finding bugs
        const accessToken = currentUser.generateAccessToken();
        const refreshToken = currentUser.generateRefreshToken();
        currentUser.refreshToken = refreshToken; //for refreshing the token once access token in expired
       

        currentUser// Save or update the user document in the database
        .save()
        .then(savedUser => {
            console.log('Tokens generated and added successfully!');
          })
        .catch(err => {
            next(err)
          });
        return {accessToken, refreshToken};
    }catch(error){
        next(error);        
    }
}

const options = {
    httpOnly: true,
    secure: true
}

export const registerUser = asyncHandler(async (req, res, next)=>{
    const { fullName, username, email, phone, password, gender, dateOfBirth } = req.body;
    if(
        [fullName, username, email, phone, password, gender, dateOfBirth].some(field=>field?.trim() ? 0 : 1)
    ){
        throw new errorPacket(206, "All fields are necessary!");
    }

    if(!validateEmail(email)){
        throw new errorPacket(406, "Invalid E-mail")
    }
    try{
        const isUserExists = await User.findOne(
            {
                $or: [{username}, {email}]
            }
        )

        if(isUserExists){
            throw new errorPacket(409, "USER with this credentials already EXISTS!");
        }

        const newUser = await User.create(req.body);
        if(!newUser){
            throw new errorPacket(500, "Something went WRONG! while registration.")
        }
        const data = await User.findById(newUser?._id).select("-password -refreshToken");
        return res
            .status(200)
            .json(
                new apiResponse(200,"User registration successfull.", data)
            )
    } 
    catch (error) {
        next(error);
    }
})

export const loginUser = asyncHandler(async (req, res, next)=>{

    const {email, password} = req.body;
    try {
        if(
            [email, password].some(field=>field?.trim()?0:1)
        ){
            throw new errorPacket(409, "All fields are required!");
        }
    
        const currentUser = await User.findOne({email});
        if(!currentUser){
            throw new errorPacket(409, "User doesn't exist");
        }
        const passwordValidation = currentUser.isPasswordCorrect(password);
        if(!passwordValidation){
            throw new errorPacket(409, "Credentials didn't match.");
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(currentUser?._id);
        const loggedInUser = await User.findById(currentUser?._id).select("-password -refreshToken");
        
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new responsePacket(200, "Login Successful!", loggedInUser)
            );  
    } catch (error) {
        next(error);
    }
})


