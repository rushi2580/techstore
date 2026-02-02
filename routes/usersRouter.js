import express from 'express'


import { loginuser, logoutUser, registerUser } from '../controller/authcontroller.js';
const router = express.Router();



router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.post('/login',loginuser)

export default router;