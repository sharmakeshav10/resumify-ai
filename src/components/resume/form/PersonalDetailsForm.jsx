import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/context/ResumeContext";
import { toast, useToast } from "@/hooks/use-toast";
import ApiService from "@/service/ApiService";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const PersonalDetailsForm = ({ enabledNext }) => {
  const { resumeInfo, updateResume } = useResume();
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { resumeId } = useParams();

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    // setting form for the current data
    setFormData({
      ...formData,
      [name]: value,
    });

    // update original form info
    updateResume({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        data: formData,
      };

      const response = await ApiService.updateResumeDetails(data, resumeId);
      if (response) {
        console.log(response);
        enabledNext(true);
        setIsLoading(false);
        toast({
          variant: "success",
          description: "Details updated successfully!",
        });
      }
    } catch (e) {
      console.log("Could not update the resume:", e);

      setIsLoading(false);
    }
  };

  return (
    <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl ">Personal Details</h2>
      <p className="font-semibold text-lg  mt-1">
        Let's fill some basic information
      </p>

      <form onSubmit={handleSaveForm}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <Label className="text-sm">First Name</Label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label className="text-sm">Last Name</Label>
            <Input
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label className="text-sm">Job Title</Label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label className="text-sm">Address</Label>
            <Input
              name="address"
              defaultValue={resumeInfo?.address}
              className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label className="text-sm">Phone</Label>
            <Input
              name="phone"
              defaultValue={resumeInfo?.phone}
              className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label className="text-sm">Email</Label>
            <Input
              name="email"
              defaultValue={resumeInfo?.email}
              className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-teal-600 text-white hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
          >
            {isLoading ? <Loader /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
