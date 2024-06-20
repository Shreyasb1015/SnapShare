import Router from 'express';
import { addStory,removeStory,getMyStories,getStories } from '../controllers/story.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {handleStoryImage} from '../middlewares/story.middleware.js';


const router = Router();

router.route('/addstory').post(verifyJWT,handleStoryImage,addStory);
router.route('/mystories').get(verifyJWT,getMyStories);
router.route('/allstories').get(verifyJWT,getStories);
router.route('/:storyId/delete').delete(verifyJWT,removeStory);


export default router;