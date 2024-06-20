import {Router} from 'express';
import {register,loginUser,logout,updateProfile,changePassword} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { handleProfilePic } from '../middlewares/profileUpdate.middleware.js';

const router=Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);

//Secured routes
router.route("/logout").get(verifyJWT,logout);
router.route("/updateProfile").patch(verifyJWT,handleProfilePic,updateProfile);
router.route("/changePassword").patch(verifyJWT,changePassword);

export default router;