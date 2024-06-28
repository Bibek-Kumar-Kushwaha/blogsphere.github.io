import express from 'express';
import { registerController } from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/register', registerController);

export default router;

