import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <div>
      <p className="text-xs text-slate-600">{resumeInfo?.summary}</p>
    </div>
  );
};

export default SummaryPreview;
