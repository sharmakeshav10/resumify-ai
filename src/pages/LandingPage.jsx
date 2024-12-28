import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/clerk-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LandingPage = () => {
  return (
    <div>
      <Header />
      LandingPage
      <Button>Hello</Button>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your resume</DialogTitle>
            <div className="my-4">
              <Label>Enter the name of your resume</Label>
              <Input className="my-2" />
            </div>
            <div className="flex justify-end">
              <Button className="border">Create</Button>
              <Button>Cancel</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
