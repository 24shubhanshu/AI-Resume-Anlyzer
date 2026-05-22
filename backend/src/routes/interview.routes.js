const express=require("express");
const interviewRouter=express.Router();
const authmiddleware= require("../middleware/auth.middleware");
const interviewController=require("../controller/interview.controller");
const uplaod=require("../middleware/file.middleware");

/**
 * @routes /api/interview
 * @description create interview report on the basis of self description job description and resume
 * @access private
 */

interviewRouter.post("/",authmiddleware.authUser,uplaod.single("resume"),interviewController.generateInterviewReportController);

/**
 * @routes /api/interview/report/:interviewId;
 * @description get interview report by interview id
 * @access private
 *
 */
interviewRouter.get("/report/:interviewId",authmiddleware.authUser,interviewController.getInterviewReportbyIdController);



/** * @routes /api/interview
 * @description get all interview report of current user
 * @access private
 *
 */
interviewRouter.get("/",authmiddleware.authUser,interviewController.getAllInterviewReportController);

module.exports=interviewRouter;