import express from "express";
import { login, signup, explogin, expsignup,forgotpassword,expforgotPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/explogin', explogin);
router.post('/expsignup', expsignup);
router.post('/forgotpassword', forgotpassword);
router.post('/expforgotpassword', expforgotPassword);

export default router;
