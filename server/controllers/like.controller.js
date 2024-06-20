import {Like} from '../models/like.models.js';  
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {Post} from '../models/post.models.js';


const addLike=asyncHandler(async(req,res)=>{

    const postId=req.params.postId;
    if(!postId){
        throw new ApiError("Post Id is required",400);
    }
    const like=await Like.create({post:postId,user:req.user._id});
    if(!like){
        throw new ApiError("Something went wrong",500);
    }
    const post=await Post.findById(postId);
    post.likes.push(like._id);
    await post.save();
    return res.json(new ApiResponse(200,like,"Like added successfully"));
})

const removeLike=asyncHandler(async(req,res)=>{

    const postId=req.params.postId;
    if(!postId){
        throw new ApiError("Post Id is required",400);
    }
    const like=await Like.findOne({post:postId,user:req.user?._id});
    if(!like){
        throw new ApiError("Like not found",404);
    }
    const post=await Post.findById(postId);
    post.likes.pull(like._id);
    await post.save();
    const deletedLike=await Like.findByIdAndDelete(like._id);
    if(!deletedLike){
        throw new ApiError("Something went wrong",500);
    }
    return res.json(new ApiResponse(200,{},"Like removed successfully"));
})

export {addLike,removeLike}

