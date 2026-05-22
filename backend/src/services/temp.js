const generateInterviewReport = require("./ai.services");

const resume = `
Name: Shubhanshu Maurya

Skills:
- HTML
- CSS
- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- SQL
- Java
- Git & GitHub

Projects:
1. Task Mate
   - Role-based task management system
   - Built using React.js
   - Authentication, dashboard, task tracking

2. Resume Analyzer
   - AI-powered resume analysis system
   - Generates interview questions
   - Match score, skill gap analysis
   - Preparation roadmap generation

Experience:
- Fresher
- Strong frontend and MERN stack development knowledge

Education:
B.Tech in Computer Science
`;

const selfDescription = `
I am a passionate MERN Stack Developer with strong skills in React.js, Node.js, MongoDB, and JavaScript. 

I enjoy building scalable web applications and solving real-world problems through technology. I have hands-on experience in frontend and backend development, API integration, authentication systems, and database management.

I am currently targeting full-stack and backend developer roles where I can improve my expertise in scalable systems, API development, and performance optimization.
`;

const jobDescription = `
Position: MERN Stack Developer

Location: Remote / Bangalore

We are looking for a MERN Stack Developer with strong experience in React.js, Node.js, Express.js, and MongoDB to build scalable and high-performance web applications.

Responsibilities:
- Design and develop scalable RESTful APIs using Node.js and Express.js
- Build responsive UI using React.js
- Optimize database performance and API efficiency
- Implement authentication and authorization systems
- Work with MongoDB and database design
- Write clean, maintainable, and scalable code
- Collaborate with frontend and backend teams

Required Skills:
- React.js
- Node.js
- Express.js
- MongoDB
- JavaScript
- REST APIs
- Git & GitHub

Preferred:
- Problem-solving skills
- Understanding of scalable architecture
- Good communication skills
`;

generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
});