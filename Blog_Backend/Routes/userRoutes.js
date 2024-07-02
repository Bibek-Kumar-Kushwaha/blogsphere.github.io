import express from 'express';
import { getAllUser, loginController, logoutController, registerController } from '../Controllers/userControllers.js';
import { isAdmin, isAuthorized } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout',logoutController);
router.get('/alluser',isAuthorized,isAdmin,getAllUser);

export default router;

