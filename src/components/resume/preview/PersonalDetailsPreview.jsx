import { Mail, PhoneCall } from "lucide-react";
import React from "react";

const PersonalDetailsPreview = ({ resumeInfo }) => {
  console.log("PDR: ", resumeInfo);
  return (
    <div className="">
      {/* name */}
      <h2 className="text-center font-bold">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      {/* title */}
      <h2
        className="text-center font-medium"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.jobTitle.toUpperCase()}
      </h2>
      {/* address */}
      <h2 className="text-center text-xs">{resumeInfo?.address}</h2>

      {/* phone and email */}
      <div className="flex justify-between">
        {/* phone */}
        <div className="flex items-center gap-2">
          <PhoneCall size={12} style={{ color: resumeInfo?.themeColor }} />
          <p className="text-xs">{resumeInfo?.phone}</p>
        </div>

        {/* email */}
        <div className="flex items-center gap-2">
          <Mail size={12} style={{ color: resumeInfo?.themeColor }} />
          <p className="text-xs">{resumeInfo?.email}</p>
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
};

export default PersonalDetailsPreview;
