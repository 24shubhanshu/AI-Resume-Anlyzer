const pdfParse = require("pdf-parse");
const generateInterviewReport= require("../services/ai.services");
const interviewReportModel= require("../model/interviewReport.model");


/**
 * 
 * @description generate interview report by ai based on resume job description and self description
 */
async function generateInterviewReportController(
  req,
  res
) {
  try {
    let resumeContent = "";

    if (req.file) {
      const resumeData =
        await pdfParse(
          req.file.buffer
        );

      resumeContent =
        resumeData.text;
    }

    const {
      title,
      jobDescription,
      selfDescription,
    } = req.body;

    if (
      !resumeContent &&
      !selfDescription
    ) {
      return res.status(400).json({
        message:
          "Resume or self description is required",
      });
    }

    const interviewReportbyAi =
      await generateInterviewReport({
        resume: resumeContent,
        jobDescription,
        selfDescription,
      });

    interviewReportbyAi.matchScore =
      parseInt(
        interviewReportbyAi.matchScore
      );

    const interviewReport =
      await interviewReportModel.create({
        user: req.user.id,
        title:
          interviewReportbyAi.title,
        resume: resumeContent,
        jobDescription,
        selfDescription,
        ...interviewReportbyAi,
      });

    res.status(201).json({
      interviewReport,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
}


async function getInterviewReportbyIdController(req, res) {
  try {
    const { interviewId } = req.params;

    console.log("Interview ID:", interviewId);
    console.log("User:", req.user);

    const interviewReport =
      await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user?.id,
      });

    if (!interviewReport) {
      return res.status(404).json({
        message: "interview report not found",
      });
    }

    res.status(200).json({
      message: "interview report found",
      interviewReport,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

async function getAllInterviewReportController(req,res){
    const interviewReports= await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v  -skillGaps -preparationPlan  -behavioralQuestions -technicalQuestions  ");
    res.status(200).json({      message:"interview reports fetched successfully",   interviewReports})
}

module.exports={generateInterviewReportController,getInterviewReportbyIdController,getAllInterviewReportController};