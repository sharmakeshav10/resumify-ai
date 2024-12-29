import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <>
      <div className="my-3">
        {/* heading */}
        <h2
          className="text-xl font-semibold mb-2 w-full border-b-2"
          style={{
            color: resumeInfo?.themeColor,
            borderColor: resumeInfo?.themeColor,
          }}
        >
          EXPERIENCE
        </h2>

        {resumeInfo?.experience.map((exp) => (
          <div>
            {/* job title */}
            <h2>{exp?.title}</h2>

            {/* comapny name */}
            <h2 className="font-bold" style={{ color: resumeInfo?.themeColor }}>
              {exp?.companyName}
            </h2>

            {/* date and location */}
            <div className="flex justify-between">
              <h2 className="text-sm text-slate-600">
                {exp?.startDate} -{" "}
                {exp?.currentlyWorking ? "Present" : exp?.endDate}
              </h2>
              <h2 className="text-sm text-slate-600">
                {exp?.city}, {exp?.state}
              </h2>
            </div>

            {/* work summary */}
            <ul className="list-disc pl-5 mt-2">
              {exp?.workSummery
                .split("\n")
                .map((item, index) => item.trim()) // Split and clean the string
                .filter((item) => item.length > 0) // Filter out empty strings
                .map((workItem, index) => (
                  <li key={index} className="text-sm text-slate-600">
                    {workItem}
                  </li>
                ))}
            </ul>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperiencePreview;
