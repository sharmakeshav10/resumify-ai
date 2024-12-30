import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/context/ResumeContext";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const experienceFormData = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const ExperienceForm = () => {
  const [experienceList, setExperienceList] = useState([experienceFormData]);
  const { resumeInfo, updateResume } = useResume();

  const handleInputChange = (index, e) => {
    const newEntries = experienceList.slice(); //create new array with same values
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewWorkExperience = () => {
    setExperienceList([...experienceList, experienceFormData]);
  };

  const removeWorkExperience = () => {
    if (experienceList.length > 1) {
      //remove the last experience added
      setExperienceList((experience) => experience.slice(0, -1));
    }
  };

  const handleRichTextEditorChange = (e, name, index) => {
    const newEntries = experienceList.slice(); //create new array with same values
    const { value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    console.log(experienceList);
    if (resumeInfo && resumeInfo?.experience) {
      updateResume({
        ...resumeInfo,
        experience: experienceList,
      });
    }
  }, [experienceList, resumeInfo]);

  return (
    <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl ">Professional Experience</h2>
      <p className="font-semibold text-lg  mt-1">
        Add details about your previous roles
      </p>

      <div className="mt-6">
        {experienceList.map((exp, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
              <div>
                <Label className="text-xs">Position Title</Label>
                <Input
                  name="title"
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div>
                <Label className="text-xs">Company Name</Label>
                <Input
                  name="companyName"
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div>
                <Label className="text-xs">City</Label>
                <Input
                  name="city"
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div>
                <Label className="text-xs">State</Label>
                <Input
                  name="state"
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div>
                <Label className="text-xs">Start Date</Label>
                <Input
                  name="startDate"
                  type="date"
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div>
                <Label className="text-xs">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
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
              onClick={addNewWorkExperience}
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
            >
              <Plus /> Add a Work Experience
            </Button>
            {experienceList.length > 1 && (
              <Button
                variant="outline"
                onClick={removeWorkExperience}
                className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
              >
                <Minus /> Remove
              </Button>
            )}
          </div>

          <Button
            // disabled={isLoading}
            type="submit"
            className="bg-teal-600 text-white hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
          >
            {/* {isLoading ? <Loader /> : "Save"} */}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
