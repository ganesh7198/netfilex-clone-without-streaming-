import express from 'express'
import { loginController, logoutController, signupController } from '../Controllers/auth.controller.js';

import { protectedRoute } from "../middleware/protectroute.js";

const router=express.Router();

router.post("/signup",signupController);
router.post("/login",loginController);
router.post("/logout",logoutController);
router.get("/getme", protectedRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});


export default router;