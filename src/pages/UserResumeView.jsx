import ResumePreview from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";
import ApiService from "@/service/ApiService";
import { useUser } from "@clerk/clerk-react";
import html2pdf from "html2pdf.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserResumeView = () => {
  const { resumeId } = useParams();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { resumeInfo, updateResume } = useResume();
  console.log(resumeId);

  useEffect(() => {
    getResumeInfo();
  }, []);

  const handleDownload = () => {
    const element = document.getElementById("download");
    console.log("elem ", element);

    const options = {
      margin: 10,
      filename: `${user?.firstName}_resume.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Convert the element to PDF and download
    html2pdf().from(element).set(options).save();
  };

  const getResumeInfo = async () => {
    console.log("inside resume view");

    setIsLoading(true);
    try {
      const response = await ApiService.getResumeInfoById(resumeId);
      if (response) {
        console.log(response.data.data);
        updateResume(response?.data?.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log("Couldnt fetch resume preview: ", e);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Main container */}
      <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-teal-600">
          Congrats! Your AI-generated resume is ready
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-6 font-medium">
          Download and share with your friends and family
        </p>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={handleDownload}
            className="w-1/3 py-3 bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 transition duration-300"
          >
            Download Resume
          </Button>
          <Button className="w-1/3 py-3 bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 transition duration-300">
            Share Resume
          </Button>
        </div>

        {/* Resume Preview Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md h-auto overflow-auto">
          <h3 className="text-xl font-semibold text-teal-600 mb-4">
            Resume Preview
          </h3>
          <div id="download">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResumeView;
