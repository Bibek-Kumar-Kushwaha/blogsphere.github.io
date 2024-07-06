import express from 'express';
import {readersController ,authorsController,getAllUser, loginController, logoutController, registerController, myProfileController } from '../Controllers/userControllers.js';
import { isAdmin, isAuthorized } from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multerMiddleware.js';

const router = express.Router();

router.post('/register',upload.single('avatar'), registerController);
router.post('/login', loginController);
router.get('/logout',logoutController);
router.get('/readers',readersController);
router.get('/authors',authorsController);
router.get('/alluser',isAuthorized,isAdmin,getAllUser);
router.get('/myprofile',isAuthorized,myProfileController);

export default router;

