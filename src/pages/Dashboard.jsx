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
    setHasError(false); // Reset error state before making a request
    try {
      const response = await ApiService.getUsersResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      console.log("Resume list", response.data.data);
      setResumeList(response?.data?.data || []); // Safely set data to avoid undefined issues
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
    <div className="px-8">
      <h1 className="text-3xl font-bold my-6">My Resumes</h1>

      {/* Add Resume Section - Always visible */}
      <AddResume />

      {/* Loader */}
      {isLoading && !hasError && (
        <div className="flex justify-center items-center mb-4">
          <Loader2 className="animate-spin text-teal-500" size={48} />
        </div>
      )}

      {/* Error Fallback UI */}
      {hasError && !isLoading && (
        <div className="flex justify-center items-center text-red-600 mb-4">
          <p>Oops! Something went wrong while fetching your resumes.</p>
        </div>
      )}

      {/* If no resumes found */}
      {!isLoading && !hasError && resumeList.length === 0 && (
        <div className="flex justify-center items-center text-gray-600 mb-4">
          <p>You haven't added any resumes yet. Please add one!</p>
        </div>
      )}

      {/* Show resumes if they are available */}
      {!isLoading && !hasError && resumeList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resumeList.map((resume) => (
            <ResumeCard key={resume.resumeId} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
