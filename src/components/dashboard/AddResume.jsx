import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ApiService from "@/service/ApiService";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  const createResume = async (e) => {
    setIsLoading(true);
    const resumeId = crypto.randomUUID();
    console.log(resumeTitle, resumeId);

    const data = {
      data: {
        title: resumeTitle,
        resumeId: resumeId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    try {
      const response = await ApiService.CreateNewResume(data);
      console.log(response.data.data.documentId);
      if (response) {
        setIsLoading(false);
        navigate(`/dashboard/resume/${response.data.data.documentId}/edit`);
      }
    } catch (e) {
      console.log("Cannot create resume due to: ", e);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Create Resume Button */}
      <div className="bg-white p-14 rounded-lg shadow-md flex flex-col items-center justify-center border-2 border-dashed border-teal-300">
        <Button
          className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
          onClick={() => setOpenDialog(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Resume
        </Button>
      </div>

      {/* Dialog Component */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto" // Solid background and padding for clarity
        >
          <DialogHeader>
            <DialogTitle>Create your resume</DialogTitle>
            <DialogDescription>
              Enter a name for your new resume.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="resumeName">Resume Name</Label>
            <Input
              id="resumeName"
              className="my-2"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={!resumeTitle}
              onClick={createResume}
              className="bg-teal-600 text-white hover:bg-teal-700 mr-2"
            >
              {isLoading ? <Loader /> : "Create"}
            </Button>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
