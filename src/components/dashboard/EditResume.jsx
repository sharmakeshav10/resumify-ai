import React from "react";
import ResumeForm from "../resume/ResumeForm";
import ResumePreview from "../resume/ResumePreview";
import { ResumeProvider } from "@/context/ResumeContext";

const EditResume = () => {
  return (
    <ResumeProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* resume form section */}
        <ResumeForm />

        {/* resume preview section */}
        <ResumePreview />
      </div>
    </ResumeProvider>
  );
};

export default EditResume;
