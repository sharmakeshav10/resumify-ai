import dummy from "@/data/dummy";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState();

  const updateResume = (newResumeInfo) => {
    setResumeInfo((prevState) => ({
      ...prevState,
      ...newResumeInfo,
    }));
  };

  return (
    <ResumeContext.Provider value={{ resumeInfo, updateResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const resumeState = useContext(ResumeContext);

  return resumeState;
};
