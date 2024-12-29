import React from "react";

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div>
      {/* heading */}
      <h2
        className="text-xl font-semibold mb-2 w-full border-b-2"
        style={{
          color: resumeInfo?.themeColor,
          borderColor: resumeInfo?.themeColor,
        }}
      >
        SKILLS
      </h2>

      {resumeInfo?.skills.map((skill) => (
        <div className="inline-block mr-2 mb-1">
          <div className="border border-slate-300 px-3 py-1 rounded-xl">
            <h2 className="text-sm text-slate-600">{skill?.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsPreview;
