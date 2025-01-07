import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LayoutGrid } from "lucide-react";
import ApiService from "@/service/ApiService";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/context/ResumeContext";

const ResumeTheme = () => {
  const { resumeId } = useParams();
  const { toast } = useToast();
  const { resumeInfo, updateResume } = useResume();
  const [selectedTheme, setSelectedTheme] = useState();

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const handleChangeTheme = async (color) => {
    try {
      setSelectedTheme(color);
      const data = {
        data: {
          themeColor: color,
        },
      };

      updateResume({
        ...resumeInfo,
        themeColor: color,
      });

      const response = await ApiService.updateResumeDetails(data, resumeId);
      if (response) {
        toast({
          variant: "success",
          description: "Theme updated successfully!",
        });
      }
    } catch (e) {
      console.log("THeme not udpated ", e);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="border border-slate-400 bg-white text-slate-800 hover:shadow-md rounded mr-2 text-md"
          >
            <LayoutGrid /> Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white dark:bg-gray-800 ml-8">
          <h2 className="font-medium mb-2">Choose a theme</h2>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <div
                onClick={() => handleChangeTheme(color)}
                className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedTheme == color && "border border-black"}
             `}
                style={{ background: color }}
              ></div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ResumeTheme;
