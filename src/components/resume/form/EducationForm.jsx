import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/context/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import ApiService from "@/service/ApiService";
import { Loader, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const educationFormData = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const EducationForm = ({ enabledNext }) => {
  const [educationList, setEducationList] = useState([educationFormData]);
  const { resumeInfo, updateResume } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const { resumeId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    if (resumeInfo?.education && resumeInfo?.education.length > 0) {
      setEducationList(resumeInfo?.education);
    }
  }, []);

  const handleInputChange = (index, e) => {
    enabledNext(false);
    const newEntries = [...educationList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const addNewEducation = () => {
    setEducationList([...educationList, { ...educationFormData }]);
  };

  const removeEducation = () => {
    if (educationList.length > 1) {
      setEducationList(educationList.slice(0, -1));
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

      const response = await ApiService.updateResumeDetails(data, resumeId);
      if (response) {
        setIsLoading(false);
        enabledNext(true);
        toast({
          variant: "success",
          description: "Education updated successfully!",
        });
      }
    } catch (e) {
      console.log("Could not update education:", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeInfo) {
      updateResume({
        ...resumeInfo,
        education: educationList,
      });
    }
  }, [educationList]);

  return (
    <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl">Education</h2>
      <p className="font-semibold text-lg mt-1">
        Add details about your education
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
                    value={edu?.universityName}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Degree</Label>
                  <Input
                    name="degree"
                    value={edu?.degree}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* School */}
                <div>
                  <Label className="text-xs">Major</Label>
                  <Input
                    name="major"
                    value={edu?.major}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* Start Date */}
                <div>
                  <Label className="text-xs">Start Date</Label>
                  <Input
                    name="startDate"
                    type="date"
                    value={edu?.startDate}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* End Date */}
                <div>
                  <Label className="text-xs">End Date</Label>
                  <Input
                    name="endDate"
                    type="date"
                    value={edu?.endDate}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <Label className="text-xs">Description</Label>
                  <Input
                    name="description"
                    value={edu?.description}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
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
                <Plus /> Add Education
              </Button>
              {educationList.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={removeEducation}
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
