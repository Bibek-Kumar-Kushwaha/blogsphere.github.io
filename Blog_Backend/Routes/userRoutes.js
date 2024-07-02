import express from 'express';
import { loginController, logoutController, registerController } from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout',logoutController);

export default router;

