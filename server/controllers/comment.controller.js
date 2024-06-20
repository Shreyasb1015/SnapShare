import {Comment} from '../models/comment.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Post } from '../models/post.models.js';

const addComment=asyncHandler(async(req,res)=>{

    const postId=req.params.postId;
    const {content}=req.body;
    const comment = await Comment.create({ user: req.user?._id, post: postId, content });
    if(!comment){
        throw new ApiError(400,"Comment not created")
    }
    const post=await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();
    const commentPopulated=await Comment.findById(comment._id).populate("user","username email profilePicture");


    return res.status(200).json(new ApiResponse(200,commentPopulated,"Comment created successfully!"));
})

const getComments=asyncHandler(async(req,res)=>{
    const postId=req.params.postId;
    if(!postId){
        throw new ApiError(400,"PostId is required")
    }
    const comments=await Comment.find({post:postId}).populate("user","username email profilePicture");
    if(!comments){
        throw new ApiError(400,"No comments found")
    }   
    return res.status(200).json(new ApiResponse(200,comments,"Comments fetched successfully!"));
})

const deleteComment=asyncHandler(async(req,res)=>{

    const commentId=req.params.commentId;
    const userId=req.user?._id;
    if(!commentId){
        throw new ApiError(400,"CommentId is required")
    }
    
    const commentCheck=await Comment.findById(commentId);
    if(commentCheck.user.toString()!==userId.toString()){
        return res.status(401).json(new ApiResponse(401,{},'You are not allowed to delete this comment!'))
    }
    const post=await Post.findById(commentCheck.post);
    post.comments.pull(commentId);
    await post.save();
    const comment=await Comment.findByIdAndDelete(commentId);
    if(!comment)
        {
            throw new ApiError(400,"Comment not deleted")
        }
    
    return res.status(200).json(new ApiResponse(200,{},'Comment deleted successfully!'))
})

export{addComment,getComments,deleteComment};