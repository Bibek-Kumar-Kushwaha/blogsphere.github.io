import express from 'express';
import {readersController ,authorsController,getAllUser, loginController, logoutController, registerController, myProfileController } from '../Controllers/userControllers.js';
import { isAdmin, isAuthorized } from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multerMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register',upload, registerController);
userRouter.post('/login', loginController);
userRouter.get('/logout',logoutController);
userRouter.get('/readers',readersController);
userRouter.get('/authors',authorsController);
userRouter.get('/alluser',isAuthorized,isAdmin,getAllUser);
userRouter.get('/myprofile',isAuthorized,myProfileController);

export default userRouter;

