import { formatDate } from "@/utils/formatDate";
import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  const experiences = resumeInfo?.experience || [];

  // Function to convert work summary to a list of <li> items
  const createWorkSummaryHtml = (summary) => {
    if (!summary) return "";
    const workItems = summary
      .split("\n")
      .map((item) => item.trim()) // Trim any extra spaces
      .filter((item) => item.length > 0); // Filter out empty strings

    return `<ul class="list-disc pl-5 mt-2">
      ${workItems
        .map(
          (workItem) => `<li class="text-sm text-slate-600">${workItem}</li>`
        )
        .join("")}
    </ul>`;
  };

  return (
    <>
      <div className="my-3">
        <h2
          className="text-xl font-semibold mb-2 w-full border-b-2"
          style={{
            color: resumeInfo?.themeColor,
            borderColor: resumeInfo?.themeColor,
          }}
        >
          EXPERIENCE
        </h2>

        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={index}>
              {/* Job Title */}
              <h2>{exp?.title}</h2>

              {/* Company Name */}
              <h2
                className="font-bold"
                style={{ color: resumeInfo?.themeColor }}
              >
                {exp?.companyName}
              </h2>

              {/* Date and Location */}
              <div className="flex justify-between">
                <h2 className="text-sm text-slate-600">
                  {formatDate(exp?.startDate)} -{" "}
                  {exp?.currentlyWorking ? "Present" : formatDate(exp?.endDate)}
                </h2>
                <h2 className="text-sm text-slate-600">
                  {exp?.city}, {exp?.state}
                </h2>
              </div>

              {/* Work Summary with dangerouslySetInnerHTML */}
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{
                  __html: createWorkSummaryHtml(exp?.workSummary),
                }}
              />
              <hr className="my-2" />
            </div>
          ))
        ) : (
          <p>No experience information available.</p> // Fallback message if experience is empty
        )}
      </div>
    </>
  );
};

export default ExperiencePreview;
