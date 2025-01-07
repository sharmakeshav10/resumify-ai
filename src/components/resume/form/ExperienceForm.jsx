import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/context/ResumeContext";
import ApiService from "@/service/ApiService";
import { Loader, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const experienceFormData = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const ExperienceForm = ({ enabledNext }) => {
  const [experienceList, setExperienceList] = useState([experienceFormData]);
  const { resumeInfo, updateResume } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const { resumeId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    if (resumeInfo?.experience && resumeInfo?.experience.length > 0) {
      setExperienceList(resumeInfo?.experience);
    }
  }, []);

  const handleInputChange = (index, e) => {
    enabledNext(false);
    const newEntries = [...experienceList]; //create new array with same values
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewWorkExperience = () => {
    setExperienceList([...experienceList, { ...experienceFormData }]); // Ensure a new empty form is added
  };

  const removeWorkExperience = () => {
    if (experienceList.length > 1) {
      //remove the last experience added
      setExperienceList((experience) => experience.slice(0, -1));
    }
  };

  const handleRichTextEditorChange = (e, name, index) => {
    enabledNext(false);
    const newEntries = [...experienceList]; //create new array with same values
    const { value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        data: {
          experience: experienceList.map(({ id, ...rest }) => rest), // Map without the 'id' field
        },
      };

      const response = await ApiService.updateResumeDetails(data, resumeId);
      if (response) {
        enabledNext(true);
        setIsLoading(false);
        toast({
          variant: "success",
          description: "Experience updated successfully!",
        });
      }
    } catch (e) {
      console.log("Could not update the experience:", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeInfo && resumeInfo?.experience) {
      updateResume({
        ...resumeInfo,
        experience: experienceList,
      });
    }
  }, [experienceList]);

  return (
    <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl ">Professional Experience</h2>
      <p className="font-semibold text-lg  mt-1">
        Add details about your previous roles
      </p>

      <form onSubmit={handleSaveExperience}>
        <div className="mt-6">
          {experienceList.map((exp, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
                {/* Position Title */}
                <div>
                  <Label className="text-xs">Position Title</Label>
                  <Input
                    name="title"
                    value={exp?.title}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <Label className="text-xs">Company Name</Label>
                  <Input
                    name="companyName"
                    value={exp?.companyName}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* City */}
                <div>
                  <Label className="text-xs">City</Label>
                  <Input
                    name="city"
                    value={exp?.city}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* State */}
                <div>
                  <Label className="text-xs">State</Label>
                  <Input
                    name="state"
                    value={exp?.state}
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
                    value={exp?.startDate}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* End Date */}
                <div>
                  <Label className="text-xs">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    value={exp?.endDate}
                    className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>

                {/* Work Summary (Rich Text Editor) */}
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    enabledNext={enabledNext}
                    defaultValue={exp?.workSummary}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditorChange(e, "workSummary", index)
                    }
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
                onClick={addNewWorkExperience}
                className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
              >
                <Plus /> Add a Work Experience
              </Button>
              {experienceList.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={removeWorkExperience}
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
              {isLoading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
