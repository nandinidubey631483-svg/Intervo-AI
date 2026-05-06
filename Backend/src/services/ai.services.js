const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod")  
const { zodToJsonSchema } = require("zod-to-json-schema")   
const puppet = require("puppeteer");
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});


const interviewReportSchema = z.object({
   title: z.string().describe("The title of the job for which the interview report is generated"),
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
   
})


async function generateInterviewReport(resume, selfDescription, jobDescription){

    const prompt = `
You are an expert technical interviewer and career coach.

Your task is to generate a detailed interview report STRICTLY in JSON format and also create a title also.

⚠️ IMPORTANT RULES:
-Create title based on the job description and candidate's profile, it should be catchy and relevant.
- Output MUST be valid JSON only
- Do NOT include any explanation, text, or markdown
- Do NOT add extra fields outside the schema
- Follow the schema EXACTLY
- All required fields must be present
- matchScore must be between 0 and 100
- severity must be only one of: low, medium, high

📌 JSON STRUCTURE TO FOLLOW:

{
  "title": string,
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ],
  "title": string
}

📥 INPUT DATA:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

🎯 Generate a realistic, practical, and structured interview report.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents:prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })
    return JSON.parse(response.text);
    
}

async function generateResumePdfFromHtml(htmlContent) {
  const browser = await puppet.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({resume, selfDescription, jobDescription}) {

     
  const resumePdfSchema = z.object({
    html: z.string().describe("HTML content of the resume which will be used to generate the resume PDF")
  })

  const prompt2 = `Generate a resume  for a candidate based on the following information.The response should be a JSON object with a single field "html" which contains the HTML content of the resume. The resume should be well-structured, professional, and tailored for the job description provided. Use the self description to highlight the candidate's key skills, experience, and achievements. The resume should be ATS-friendly and should effectively showcase the candidate's suitability for the job. 
     Resume: ${resume}
     selfDescription: ${selfDescription}
     jobDescription: ${jobDescription}`


    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents:prompt2,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema)
        }
    })
     const jsonContent =JSON.parse(response.text);
     const pdfBuffer = await generateResumePdfFromHtml(jsonContent.html);
      return pdfBuffer;

}

module.exports = {generateInterviewReport, generateResumePdf}