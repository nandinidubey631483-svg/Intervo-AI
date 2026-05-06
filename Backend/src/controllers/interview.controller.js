const pdfParse = require("pdf-parse");
const {generateInterviewReport,generateResumePdf} = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")


async function generateInterviewReportController(req, res){
    const resumeFile = req.file;
    const {selfDescription, jobDescription}= req.body;

    const resumeContent = await  (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer) )).getText();

    const interviewReportByAI = await generateInterviewReport({
         resume: resumeContent.text,
         selfDescription, 
         jobDescription
    })
    let data = interviewReportByAI;

        if (typeof interviewReportByAI === "string") {
    let cleaned = interviewReportByAI
        .replace(/```json|```/g, "")
        .trim();

    try {
        data = JSON.parse(cleaned);
    } catch (err) {
        console.log("AI RAW RESPONSE:", interviewReportByAI);
        return res.status(500).json({
            message: "AI response invalid JSON"
        });
    }
    }

    if (!Array.isArray(data.technicalQuestions)) data.technicalQuestions = [];
    if (!Array.isArray(data.behavioralQuestions)) data.behavioralQuestions = [];
    if (!Array.isArray(data.skillGaps)) data.skillGaps = [];
    if (!Array.isArray(data.preparationPlan)) data.preparationPlan = [];

    // ✅ normalize technicalQuestions
data.technicalQuestions = data.technicalQuestions.map(q => {
    if (typeof q === "string") {
        return {
            question: q,
            intention: "Check understanding of concept",
            answer: "Provide a structured explanation with examples"
        };
    }
    return q;
});

// ✅ normalize behavioralQuestions
data.behavioralQuestions = data.behavioralQuestions.map(q => {
    if (typeof q === "string") {
        return {
            question: q,
            intention: "Evaluate communication and teamwork",
            answer: "Use STAR method"
        };
    }
    return q;
});

// ✅ normalize skillGaps
data.skillGaps = data.skillGaps.map(s => {
    if (typeof s === "string") {
        return {
            skill: s,
            severity: "low"
        };
    }
    return {
        ...s,
        severity: s.severity
            ? s.charAt(0).toLowerCase() + s.severity.slice(1)
            : "Low"
    };
});

data.preparationPlan = (data.preparationPlan || []).map((p, index) => {

    // 🔥 handle number
    if (typeof p === "number") {
        return {
            day: p,
            focus: `Day ${p} preparation`,
            tasks: [`Complete tasks for day ${p}`]
        };
    }

    // 🔥 handle string
    if (typeof p === "string") {
        return {
            day: index + 1,
            focus: p,
            tasks: [p]
        };
    }

    // 🔥 handle object (correct case)
    return {
        day: typeof p.day === "number" ? p.day : index + 1,
        focus: p.focus || "General preparation",
        tasks: Array.isArray(p.tasks) ? p.tasks : ["Practice and revise"]
    };
});



    const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    title: data.title || "Interview Report",  // 🔥 ADD THIS LINE
    matchScore: data.matchScore || 0,
    technicalQuestions: data.technicalQuestions,
    behavioralQuestions: data.behavioralQuestions,
    skillGaps: data.skillGaps,
    preparationPlan: data.preparationPlan
});

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport})
    

}


/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

/**
 * description Controller to generate resume PDF from HTML content using AI.
 */
async function generateResumePdfController(req, res) {
      
    const {interviewReportId} = req.params

    const  interviewReport = await interviewReportModel.findOne({_id:interviewReportId})
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const {resume, selfDescription, jobDescription} = interviewReport
     
    const pdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription})

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);

}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}












