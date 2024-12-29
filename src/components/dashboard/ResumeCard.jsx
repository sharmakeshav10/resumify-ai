import { FileText } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCard = ({ resume }) => {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className="bg-white p-14 rounded-lg shadow-md flex flex-col items-center justify-center border-2 border-dashed border-teal-300 hover:shadow-md hover:shadow-green-700">
        <FileText className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
        {resume.title}
      </div>
    </Link>
  );
};

export default ResumeCard;
