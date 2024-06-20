import {Post} from '../models/post.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary,deleteFromCloudinary } from '../utils/cloudinary.js';


function getPublicIdFromCloudinaryUrl(url) {
    const regex = /(?:\/upload\/v\d+\/)?([^\/.]+)(?:\.[^.]+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const uploadPost=asyncHandler(async(req,res)=>{

    const {content}=req.body;
    const postPath=req.files
    if(postPath.length==0){
        throw new ApiError(400,"No image uploaded")
    }
    const imagesArray = postPath.map(image => uploadOnCloudinary(image.path));
    const uploadedFiles = await Promise.all(imagesArray);
    const fileUrls = uploadedFiles.map(uploadedFile => uploadedFile.url);
    let post=await Post.create({user:req.user?._id,content,images:fileUrls});
    if(!post){
        throw new ApiError(400,"Post not created")
    }
    return res.status(200).json(new ApiResponse(200,post,"Post created successfully!"));


})

const getAllPosts=asyncHandler(async(req,res)=>{

    const user_id=req.user?._id;
    const posts=await Post.find({user:{$ne:user_id}}).populate('user','username email profilePicture').select('-password');
    if(!posts || posts.length === 0){
        return res.status(400).json(new ApiResponse(400,posts,"No posts found"))
    }

    return res.status(200).json(new ApiResponse(200,posts,"Posts found successfully!"));    
})  

const getAllUserPosts=asyncHandler(async(req,res)=>{

    const posts=await Post.find({user:req.user?._id}).populate('user','username email profilePicture').select('-password');
    if(!posts){
        return res.status(400).json(new ApiResponse(400,posts,"No posts found"))
    }
    return res.status(200).json(new ApiResponse(200,posts,"Posts found successfully!"));
    
})

const deletePost=asyncHandler(async(req,res)=>{

    const postId=req.params.postId;
    const post=await Post.findById(postId);
    if(!post){
        throw new ApiError(400,"Post not found")
    }
    if(post.user.toString()!==req.user._id.toString()){
        throw new ApiError(401,"You are not authorized to delete this post")
    }
    const images=post.images;
    const deletionPromises = images.map(async (image) => {
        const publicId = getPublicIdFromCloudinaryUrl(image);
        return await deleteFromCloudinary(publicId);
    });
    
    await Promise.all(deletionPromises);
    const deletedPost=await Post.findByIdAndDelete(postId);
    if(!deletedPost){
        throw new ApiError(400,"Post not deleted")
    }
    return res.status(200).json(new ApiResponse(200,{},"Post deleted successfully!"));

})

const updatePost=asyncHandler(async(req,res)=>{

    const postId=req.params.postId;
    const {content}=req.body;
    const post=await Post.findById(postId);
    if(!post){
        throw new ApiError(400,"Post not found")
    }
    if(post.user.toString()!==req.user._id.toString()){
        throw new ApiError(401,"You are not authorized to update this post")
    }
    const updatedPost=await Post.findByIdAndUpdate(postId,{content},{new:true});
    if(!updatedPost){
        throw new ApiError(400,"Post not updated")
    }
    return res.status(200).json(new ApiResponse(200,updatedPost,"Post updated successfully!"));

})

const updatePostPhotos=asyncHandler(async(req,res)=>{

    const postId=req.params.postId;
    const post=await Post.findById(postId);
    if(!post){
        throw new ApiError(400,"Post not found")
    }
    const images=post.images;
    const deletionPromises = images.map(async (image) => {
        const publicId = getPublicIdFromCloudinaryUrl(image);
        return await deleteFromCloudinary(publicId);
    });
    await Promise.all(deletionPromises);
    let postImages=req.files;
    postImages=postImages.map(async(image)=>{
        return await uploadOnCloudinary(image.path);
    })
    const uploadedFiles = await Promise.all(postImages);
    const fileUrls = uploadedFiles.map(uploadedFile => uploadedFile.url);
    const newPost=await Post.findByIdAndUpdate(postId,{images:fileUrls},{new:true});
    if(!newPost){
        throw new ApiError(400,"Post not updated")
    }
    return res.status(200).json(new ApiResponse(200,newPost,"Post updated successfully!"));
})

export {uploadPost,getAllUserPosts,deletePost,updatePost,updatePostPhotos,getAllPosts};