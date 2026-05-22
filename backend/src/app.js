const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors= require('cors');
const interviewRouter=require("./routes/interview.routes")



const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-anlyzer-five.vercel.app"
    ],
    credentials: true
  })
);

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);


module.exports = app;