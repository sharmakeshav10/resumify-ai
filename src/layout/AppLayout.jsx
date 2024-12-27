import Header from "@/components/common/Header";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
