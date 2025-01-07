import AddResume from "@/components/dashboard/AddResume";
import ResumeCard from "@/components/dashboard/ResumeCard";
import ApiService from "@/service/ApiService";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Assuming you're using lucide-react for the loader icon

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false); // To track errors

  // Function to fetch user resumes
  const getResumeList = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await ApiService.getUsersResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      setResumeList(response?.data?.data || []);
    } catch (e) {
      setHasError(true); // Set error state on failure
      console.error("Error fetching resumes:", e);
    } finally {
      setIsLoading(false); // Always stop loading after the request
    }
  };

  useEffect(() => {
    if (user) {
      getResumeList();
    }
  }, [user]);

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-600 my-6">My Resumes</h1>

      {/* Add Resume Section - Always visible */}
      <div className="mb-6">
        <AddResume />
      </div>

      {/* Loader */}
      {isLoading && !hasError && (
        <div className="flex justify-center items-center mb-8">
          <Loader2 className="animate-spin text-teal-500" size={48} />
        </div>
      )}

      {/* Error Fallback UI */}
      {hasError && !isLoading && (
        <div className="flex justify-center items-center text-red-600 mb-8">
          <p>Oops! Something went wrong while fetching your resumes.</p>
        </div>
      )}

      {/* If no resumes found */}
      {!isLoading && !hasError && resumeList.length === 0 && (
        <div className="flex justify-center items-center text-gray-600 mb-8">
          <p>You haven't added any resumes yet. Please add one!</p>
        </div>
      )}

      {/* Show resumes if they are available */}
      {!isLoading && !hasError && resumeList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resumeList.map((resume) => (
            <ResumeCard
              key={resume.resumeId}
              resume={resume}
              refreshResumeList={getResumeList}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
