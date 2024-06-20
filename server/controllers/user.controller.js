import { asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.models.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js';



const cookieOptions={
    httpOnly:true,
    secure:true,
    sameSite: 'none',
   
}

function getPublicIdFromCloudinaryUrl(url) {
    const regex = /(?:\/upload\/v\d+\/)?([^\/.]+)(?:\.[^.]+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId);
        console.log(user);
        if(!user)
        {
            throw new ApiError(404,"User not found");
        }
        const accessToken= await user.generateAccessToken();
        console.log(accessToken);
        const refreshToken= await  user.generateRefreshToken();
        console.log(refreshToken);
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};

    } catch (error) {
        
        throw new ApiError(500,"Token generation failed due to" +error.message);
    }

}

const register=asyncHandler(async(req,res)=>{

    const {username,email,password}=req.body;
    if(username === '' || email === '' || password === '')
    {
        throw new ApiError(400,"Please fill all fields");
    }
    const existeduser=await User.findOne({email});
    if(existeduser)
    {
       return res.status(400).json(new ApiResponse(400,{},"User already exists"));
    }
   

    const user=await User.create({username,email,password})
    if(!user)
    {
        throw new ApiError(500,"User not created");
    }
    const{accessToken,refreshToken}=await generateAccessAndRefreshTokens(user?._id);
    const userInfo=await User.findById(user?._id).select("-password -refreshToken -profilePicture");
    return  res.status(201).cookie("accessToken",accessToken,cookieOptions).cookie("refreshToken",refreshToken,cookieOptions).json(new ApiResponse(201,{userInfo},"User registered successfully"));


})

const loginUser=asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    if(email === '' || password === '')
    {
        throw new ApiError(400,"Please fill all fields");
    }
    const user=await User.findOne({email});
    if(!user)
    {
        throw new ApiError(404,"User not found");
    }
    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect)
    {
        throw new ApiError(400,"Invalid credentials");
    }   
    const{accessToken,refreshToken}=await generateAccessAndRefreshTokens(user?._id);    
    const loggedInUser=await User.findById(user?._id).select("-password -refreshToken");
    return res.status(200).cookie("accessToken",accessToken,cookieOptions).cookie("refreshToken",refreshToken,cookieOptions).json(new ApiResponse(200,{loggedInUser},"User logged in successfully"));
})

const logout=asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(req.user?._id,{$unset:{refreshToken:1}},{new:true}) 
    return res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse(200,{},"User logged out successfully"));
})

const updateProfile=asyncHandler(async(req,res)=>{
    const {email,username}=req.body;
    if(email === '' || username === '')
    {
        throw new ApiError(400,"Please fill all fields");
    }
    const tempUser=await User.findById(req.user?._id);
    let profilePicPath=req.file?.path || '';
    if(profilePicPath !== '')
    {
        const publicId=getPublicIdFromCloudinaryUrl(tempUser.profilePicture);
        await deleteFromCloudinary(publicId);
        profilePicPath=await uploadOnCloudinary(profilePicPath);
    }
    const user=await User.findByIdAndUpdate(req.user?._id,{email,username,profilePicture:profilePicPath.url},{new:true}).select("-password -refreshToken");
    if(!user)
    {
        throw new ApiError(500,"Profile not updated");
    }

    return res.status(200).json(new ApiResponse(200,{user},"Profile updated successfully"));


})

const changePassword=asyncHandler(async(req,res)=>{

    const {oldPassword,newPassword}=req.body;

    const user=await User.findById(req.user._id)
    const isPasswordCorrect=await user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400,"Old password is incorrect")
    }
    user.password=newPassword;
    await user.save({validateBeforeSave:false})
    return res.status(200).json(new ApiResponse(200,{},"Password changed successfully"))
})



export {register,loginUser,logout,updateProfile,changePassword}