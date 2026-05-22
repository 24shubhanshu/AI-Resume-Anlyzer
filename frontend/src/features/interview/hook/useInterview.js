import { useContext } from "react";
import {
  getInterviewReportbyId,
  generateInterviewReport,
  getAllInterviewReports,
} from "../services/interview.api";

import { InterviewContext } from "../Interview.context";

const useInterview = () => {
  const context = useContext(InterviewContext);

  const {
    loadings,
    setLoadings,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  const generateReport = async ({
  resume,
  selfDescription,
  jobDescription,
  title,
}) => {
  setLoadings(true);

  try {
    const response =
      await generateInterviewReport({
        resume,
        selfDescription,
        jobDescription,
        title,
      });

    setReport(response.interviewReport);

    return response;
  } catch (error) {
    console.log(
      "Error generating report:",
      error
    );

    return null;
  } finally {
    setLoadings(false);
  }
};
  const getReportById = async (interviewId) => {
    setLoadings(true);
    let response=null;

    try {
      const response =
        await getInterviewReportbyId(interviewId);

      setReport(response.interviewReport);
    } catch (error) {
      console.log("Error fetching report:", error);
    } finally {
      setLoadings(false);
    }
    return response.interviewReport;
  };

  const getAllReports = async () => {
    setLoadings(true);
    let response=null;

    try {
      const response =
        await getAllInterviewReports();

      setReports(response.interviewReports);
    } catch (error) {
      console.log("Error fetching reports:", error);
    } finally {
      setLoadings(false);
    }
    return response.interviewReports;
  };
  
 

  return {
    loadings,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
     
  };
};

export default useInterview;