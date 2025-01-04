import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/context/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import ApiService from "@/service/ApiService";
import { Loader, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const skillsFormData = {
  name: "",
};

const SkillsForm = () => {
  const [skillsList, setSkillsList] = useState([skillsFormData]);
  const [isLoading, setIsLoading] = useState(false);
  const { resumeInfo, updateResume } = useResume();

  const { resumeId } = useParams();

  const { toast } = useToast();

  useEffect(() => {
    resumeInfo?.skills.length > 0 && setSkillsList(resumeInfo?.skills);
  }, []);

  const handleInputChange = (index, e) => {
    const newEntries = skillsList.slice(); //create new array with same values
    const { name, value } = e.target;
    console.log(e.target.value);

    newEntries[index][name] = value;
    setSkillsList(newEntries);
    console.log("SKILLSLIST", newEntries);
  };

  const addNewSkills = () => {
    setSkillsList([...skillsList, skillsFormData]);
  };

  const removeSkills = () => {
    if (skillsList.length > 1) {
      //remove the last experience added
      setSkillsList((skill) => skill.slice(0, -1));
    }
  };

  const saveSkills = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        data: {
          skills: skillsList.map(({ id, ...rest }) => rest),
        },
      };

      console.log("DATAAAAA ", data);

      const response = await ApiService.updateResumeDetails(data, resumeId);
      if (response) {
        console.log(response);
        // enabledNext(true);
        setIsLoading(false);
        toast({
          variant: "success",
          description: "Experience updated successfully!",
        });
      }
    } catch (e) {
      console.log("Could not update the expereince:", e);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeInfo && resumeInfo?.skills) {
      updateResume({
        ...resumeInfo,
        skills: skillsList,
      });
    }
  }, [skillsList]);

  return (
    <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl ">Skills</h2>
      <p className="font-semibold text-lg  mt-1">Add your skills</p>

      <form onSubmit={saveSkills}>
        <div className="mt-6">
          {skillsList.map((skill, index) => (
            <div key={index}>
              <div className="border p-3 my-5 rounded-lg">
                <div>
                  <Label className="text-xs">Skills</Label>
                  <Input
                    name="name"
                    value={skill?.name}
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
                onClick={addNewSkills}
                className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
              >
                <Plus /> Add a New Skill
              </Button>
              {skillsList.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={removeSkills}
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

export default SkillsForm;
