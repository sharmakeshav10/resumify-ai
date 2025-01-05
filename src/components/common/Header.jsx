import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center h-14 border-b border-teal-200 shadow-sm">
      <Link to={"/"}>
        <h1 className="ml-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600">
          Resumify
        </h1>
      </Link>

      {isSignedIn ? (
        <div className="flex items-center mr-8 gap-4">
          <Link to={"/dashboard"}>
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
            >
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button className=" bg-teal-600 text-white hover:bg-teal-700 rounded">
            Get Started
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
