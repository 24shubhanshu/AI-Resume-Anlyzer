const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question that can be asked in the interview"
          ),

        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question"
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take"
          ),
      })
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and answer approach"
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioral question that can be asked in the interview"
          ),

        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question"
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take"
          ),
      })
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and answer approach"
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skill which the candidate is lacking"),

        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. low, medium or high"
          ),
      })
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity"
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The day number in the preparation plan, starting from 1"
          ),

        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan"
          ),

        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan"
          ),
      })
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview"
    ),
   title: z.string().describe("The title of the interview report"),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert AI Interview Evaluator.

Analyze the candidate profile carefully.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

STRICT RULES:

1. Return ONLY valid JSON.
2. Follow schema EXACTLY.
3. No markdown.
4. No explanation text.
5. matchScore MUST be a NUMBER only.
   Example: 75
   NOT: "75%"
6. title is REQUIRED.
7. Generate professional title based on
   resume + job description.

title examples:
- "MERN Stack Developer"
- "Frontend React Developer"
- "Backend Node.js Developer"
- "Java Full Stack Developer"

Generate:
- title
- matchScore
- minimum 5 technicalQuestions
- minimum 5 behavioralQuestions
- skillGaps
- 7 day preparationPlan

technicalQuestions format:

{
  "question": "",
  "intention": "",
  "answer": ""
}

behavioralQuestions format:

{
  "question": "",
  "intention": "",
  "answer": ""
}

skillGaps format:

[
  {
    "skill": "",
    "severity": "low"
  }
]

preparationPlan format:

[
  {
    "day": 1,
    "focus": "",
    "tasks": []
  }
]
`;

  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
          responseMimeType:
            "application/json",
          responseJSONSchema:
            zodToJsonSchema(
              interviewReportSchema
            ),
        },
      });

    const result = JSON.parse(
      response.text
    );

    // safety fixes
    result.matchScore = parseInt(
      result.matchScore
    );

    result.title =
      result.title ||
      "Software Developer";

    return result;
  } catch (error) {
    console.log(
      "Gemini Error:",
      error.message
    );
    throw error;
  }
}

module.exports = generateInterviewReport;