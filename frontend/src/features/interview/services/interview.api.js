import axios from "axios";


const api= axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
/**
 * @description generate interview report by ai based on resume job description and self description
 */

export const generateInterviewReport= async ({resume,selfDescription,jobDescription,title})=>{
    const formData= new FormData();
    formData.append("resume",resume);
    formData.append("selfDescription",selfDescription);
    formData.append("jobDescription",jobDescription);
    formData.append("title",title);         
  
    const response= await api.post("/api/interview",formData,
        {
            headers:{"Content-Type":"multipart/form-data"}
        })    
    return response.data;
}

/** * @description get interview report by interview id
 */

export  const getInterviewReportbyId= async (interviewId)=>{
    const response= await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}       

/** * @description get all interview report of current user
 */

export const getAllInterviewReports=async ()=>{
    const response= await api.get("/api/interview");
    return response.data;
}   