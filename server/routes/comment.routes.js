import Router from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {addComment,getComments,deleteComment} from '../controllers/comment.controller.js';

const router = Router();

router.route('/:postId/addComment').post(verifyJWT,addComment);
router.route('/:postId/getComments').get(verifyJWT,getComments);
router.route('/:commentId/deleteComment').delete(verifyJWT,deleteComment);


export default router;