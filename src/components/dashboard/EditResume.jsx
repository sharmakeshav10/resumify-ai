import React, { useEffect, useState } from "react";
import ResumeForm from "../resume/ResumeForm";
import ResumePreview from "../resume/ResumePreview";
import { useResume } from "@/context/ResumeContext";
import ApiService from "@/service/ApiService";
import { useParams } from "react-router-dom";

const EditResume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateResume } = useResume();
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.getResumeInfoById(resumeId);

      if (response) {
        updateResume(response.data.data);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
      {/* resume form section */}
      <ResumeForm />

      {/* resume preview section */}
      <ResumePreview />
    </div>
  );
};

export default EditResume;
