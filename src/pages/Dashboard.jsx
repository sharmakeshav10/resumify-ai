import AddResume from "@/components/dashboard/AddResume";
import React from "react";

const Dashboard = () => {
  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold my-6">My Resumes</h1>
      <AddResume />
    </div>
  );
};

export default Dashboard;
