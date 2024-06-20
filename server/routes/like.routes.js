import Router from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {addLike,removeLike} from '../controllers/like.controller.js';

const router=Router();

router.route('/:postId/addLike').post(verifyJWT,addLike);
router.route('/:postId/removeLike').delete(verifyJWT,removeLike);



export default router;