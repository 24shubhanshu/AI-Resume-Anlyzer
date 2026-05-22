import { createContext, useState } from "react";

const InterviewContext = createContext();

const InterviewProvider = ({ children }) => {
  const [loadings, setLoadings] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        loadings,
        setLoadings,
        report,
        setReport,
        reports,
        setReports,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export { InterviewContext, InterviewProvider };