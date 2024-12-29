import AddResume from "@/components/dashboard/AddResume";
import ResumeCard from "@/components/dashboard/ResumeCard";
import ApiService from "@/service/ApiService";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const getResumeList = async () => {
    try {
      const response = await ApiService.getUsersResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      console.log("Resume list", response.data.data);
      setResumeList(response?.data?.data);
    } catch (e) {}
  };

  useEffect(() => {
    user && getResumeList();
  }, [user]);

  return (
    <div className="px-8 ">
      <h1 className="text-3xl font-bold my-6">My Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, i) => (
            <ResumeCard key={resume.resumeId} resume={resume} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
