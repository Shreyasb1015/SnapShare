import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Story } from "../models/story.models.js";
import { uploadOnCloudinary,deleteFromCloudinary } from '../utils/cloudinary.js';

function getPublicIdFromCloudinaryUrl(url) {
    const regex = /(?:\/upload\/v\d+\/)?([^\/.]+)(?:\.[^.]+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const addStory=asyncHandler(async(req,res)=>{

    const {content}=req.body;
    if(!content)
        {
            throw new ApiError(400,"Please provide content");
        }
    const storypath=req.file?.path;
    const storyobj=await uploadOnCloudinary(storypath);
    const story=await Story.create({user:req.user?._id,content,image:storyobj.url});
    if(!story)
    {
        throw new ApiError(500,"Story not created");
    }
    return res.status(201).json(new ApiResponse(201,{story},"Story created successfully"));

})

const removeStory=asyncHandler(async(req,res)=>{

    const storyId=req.params.storyId;
    const story=await Story.findById(storyId);
    if(!story)
    {
        throw new ApiError(404,"Story not found");
    }
    if(story.user.toString()!==req.user?._id.toString())
    {
        return res.status(403).json(new ApiResponse(403,{},"You are not authorized to delete this story"));
    }
    const publicId=getPublicIdFromCloudinaryUrl(story.image);
    await deleteFromCloudinary(publicId);
    const deletedStory=await Story.findByIdAndDelete(storyId);
    if(!deletedStory)
    {
       return res.status(500).json(new ApiResponse(500,{},"Story not deleted"));
    }
    return res.status(200).json(new ApiResponse(200,{},"Story deleted successfully"));
})

const getMyStories=asyncHandler(async(req,res)=>{

    const stories=await Story.find({user:req.user?._id}).sort({createdAt:-1});
    if(!stories)
    {
        return res.status(404).json(new ApiResponse(404,{},"No stories found"));
    }
    return res.status(200).json(new ApiResponse(200,{stories},"Stories fetched successfully"));
})

const getStories=asyncHandler(async(req,res)=>{

    const userId=req.user?._id;
    const stories=await Story.find({user:{$ne:userId}}).populate('user').sort({createdAt:-1});
    if(!stories)
    {
        return res.status(404).json(new ApiResponse(404,{},"No stories found"));
    }

    return res.status(200).json(new ApiResponse(200,{stories},"Stories fetched successfully"));
})

export {addStory,removeStory,getMyStories,getStories}