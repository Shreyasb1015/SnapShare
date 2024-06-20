import Router from 'express';
import { uploadPost,getAllUserPosts,deletePost,updatePost,updatePostPhotos,getAllPosts } from '../controllers/post.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { handlePostPics } from '../middlewares/post.middleware.js';

const router = Router();
router.route('/create-post').post(verifyJWT, handlePostPics,uploadPost);
router.route('/myPosts').get(verifyJWT,getAllUserPosts);
router.route('/:postId/delete').delete(verifyJWT,deletePost);
router.route('/:postId/update').put(verifyJWT,updatePost);
router.route('/:postId/update-photos').put(verifyJWT,handlePostPics,updatePostPhotos);
router.route('/getAllposts').get(verifyJWT,getAllPosts);    


export default router;