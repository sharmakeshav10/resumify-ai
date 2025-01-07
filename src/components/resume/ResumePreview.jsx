import { useResume } from "@/context/ResumeContext";
import React from "react";
import PersonalDetailsPreview from "./preview/PersonalDetailsPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import { EducationPreview } from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";

const ResumePreview = () => {
  const { resumeInfo } = useResume();

  return (
    <div className="h-full border shadow-lg p-14">
      {resumeInfo ? (
        <>
          {/* personal details */}
          <PersonalDetailsPreview resumeInfo={resumeInfo} />

          {/* summary preview */}
          <SummaryPreview resumeInfo={resumeInfo} />

          {/* experience preview */}
          <ExperiencePreview resumeInfo={resumeInfo} />

          {/* educaion preview */}
          <EducationPreview resumeInfo={resumeInfo} />

          {/* skills preview */}
          <SkillsPreview resumeInfo={resumeInfo} />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-slate-500">
          <h2>Fetching your data...</h2>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
