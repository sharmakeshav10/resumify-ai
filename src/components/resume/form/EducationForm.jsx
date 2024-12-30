import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/ResumeContext";
import ApiService from "@/service/ApiService";
import { Loader, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const educationFormData = {
  universityName: "",
  degree: "",
  major: "",
  description: "",
  startDate: "",
  endDate: "",
};

const EducationForm = ({ enabledNext }) => {
  const [educationList, setEducationList] = useState([educationFormData]);
  const [isLoading, setIsLoading] = useState(false);

  const { resumeId } = useParams();

  const { resumeInfo, updateResume } = useResume();

  const { toast } = useToast();

  const handleInputChange = (index, e) => {
    const newEntries = educationList.slice(); //create new array with same values
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const addNewEducation = () => {
    setEducationList([...educationList, educationFormData]);
  };

  const removeNewEducation = () => {
    if (educationList.length > 1) {
      setEducationList((education) => education.slice(0, -1));
    }
  };

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        data: {
          education: educationList.map(({ id, ...rest }) => rest),
        },
      };

      console.log("DATAAAAA ", data);

      const response = await ApiService.updateResumeDetails(data, resumeId);
      if (response) {
        console.log(response);
        enabledNext(true);
        setIsLoading(false);
        toast({
          variant: "success",
          description: "Education details updated successfully!",
        });
      }
    } catch (e) {
      console.log("Could not update the expereince:", e);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log(experienceList);
    if (resumeInfo && resumeInfo?.education) {
      updateResume({
        ...resumeInfo,
        education: educationList,
      });
    }
  }, [educationList]);

  return (
    <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl ">Education Details</h2>
      <p className="font-semibold text-lg  mt-1">
        Please fill your education details
      </p>

      <form onSubmit={handleSaveEducation}>
        <div className="mt-6">
          {educationList.map((edu, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <Label className="text-xs">University Name</Label>
                  <Input
                    name="universityName"
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Degree</Label>
                  <Input
                    name="degree"
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Major</Label>
                  <Input
                    name="major"
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <Label className="text-xs">End Date</Label>
                  <Input
                    name="endDate"
                    type="date"
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleInputChange(index, e)}
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600 mt-5"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={addNewEducation}
                className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
              >
                <Plus /> Add New Education
              </Button>
              {educationList.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={removeNewEducation}
                  className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
                >
                  <Minus /> Remove
                </Button>
              )}
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-teal-600 text-white hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
            >
              {isLoading ? <Loader /> : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;
