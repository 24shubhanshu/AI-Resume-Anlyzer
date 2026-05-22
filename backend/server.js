require("dotenv").config()
const app= require("./src/app");
const connectDB=require("./src/config/database");
const invokeGeminiAi= require("./src/services/ai.services")


connectDB();


app.listen(3000,()=>{
    console.log("server running on 3000");
})


