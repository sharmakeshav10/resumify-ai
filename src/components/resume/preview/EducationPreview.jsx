import { Calendar } from "lucide-react";
import React from "react";

export const EducationPreview = ({ resumeInfo }) => {
  return (
    <div className="">
      {/* heading */}
      <h2
        className="text-xl font-semibold mb-2 w-full border-b-2"
        style={{
          color: resumeInfo?.themeColor,
          borderColor: resumeInfo?.themeColor,
        }}
      >
        EDUCATION
      </h2>

      {resumeInfo?.skills && resumeInfo?.skills.length > 0
        ? resumeInfo?.education.map((edu) => (
            <div className="my-4">
              <h2>
                {edu?.degree} in {edu?.major}
              </h2>

              {/* college name and date */}
              <div className="flex justify-between">
                <h2
                  className="font-semibold text-sm"
                  style={{ color: resumeInfo?.themeColor }}
                >
                  {edu?.universityName}
                </h2>

                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <h2 className="text-sm text-slate-600">
                    {edu?.startDate} - {edu?.endDate}
                  </h2>
                </div>
              </div>

              {/* college desc */}
              <h2 className="text-xs text-slate-600 mt-1">
                {edu?.description}
              </h2>
            </div>
          ))
        : "No education details available"}
    </div>
  );
};
