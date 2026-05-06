const express = require("express");
const {authUser} = require("../middlewares/auth.middleware")
const {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController,generateResumePdfController } = require("../controllers/interview.controller")
const {upload} = require("../middlewares/file.middleware")  


const interviewRouter = express.Router();


/**
 * @route POST /api/interview/
 * @desc Generate interview report
 * @access Private
 */
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController) 



/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController)
console.log(typeof getInterviewReportByIdController);


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf
 * @description Generate resume PDF from HTML content using AI.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)






module.exports = interviewRouter;