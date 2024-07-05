import express from 'express';
import { getAllUser, loginController, logoutController, registerController } from '../Controllers/userControllers.js';
import { isAdmin, isAuthorized } from '../Middleware/authMiddleware.js';
import { upload } from '../Middleware/multerMiddleware.js';

const router = express.Router();

router.post('/register',upload.single('avatar'), registerController);
router.post('/login', loginController);
router.get('/logout',logoutController);
router.get('/alluser',isAuthorized,isAdmin,getAllUser);

export default router;

