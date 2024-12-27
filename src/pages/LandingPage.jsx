import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/clerk-react";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Header />
      LandingPage
      <Button>Hello</Button>
    </div>
  );
};

export default LandingPage;
