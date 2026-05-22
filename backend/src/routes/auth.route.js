const express = require("express");
const authController= require("../controller/authController");
const authmiddleware=require("../middleware/auth.middleware");

const authRouter=express.Router();

/**
 * 
 * @route /api/auth/register
 * @description register a new user
 * @access public
 */
authRouter.post("/register",authController.registerUserController);

/**
 * 
 * @route /api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post("/login",authController.loginUserController);

/**
 * 
 * @route /api/auth/logout
 * @description logout user ,clear token and and add to blacklist mode
 * @access public
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * 
 * @route /api/auth/get-me
 * @description show current login user detailts
 * @access public
 */

authRouter.get("/get-me",authmiddleware.authUser,authController.getmeUserController);


module.exports=authRouter;