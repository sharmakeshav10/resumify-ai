import React, { useState } from "react";
import { PersonalDetailsForm } from "./form/PersonalDetailsForm";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import SummaryForm from "./form/SummaryForm";
import ExperienceForm from "./form/ExperienceForm";
import EducationForm from "./form/EducationForm";
import SkillsForm from "./form/SkillsForm";

const ResumeForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [enableNextBtn, setEnableNextBtn] = useState(false);

  const handleNextButton = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handlePrevButton = () => {
    setActiveIndex(activeIndex - 1);
  };

  return (
    <div>
      {/* top control buttons */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          className="border border-slate-400 bg-white text-slate-800 hover:shadow-md rounded mr-2 text-md"
        >
          <LayoutGrid /> Theme
        </Button>
        <div className="flex items-center gap-2">
          {activeIndex > 0 && (
            <Button
              onClick={handlePrevButton}
              className="bg-teal-600 text-white hover:bg-teal rounded"
            >
              <ChevronLeft />
            </Button>
          )}
          <Button
            disabled={!enableNextBtn}
            onClick={handleNextButton}
            className="bg-teal-600 text-white hover:bg-teal-700 rounded"
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>

      {/* personal details */}
      {activeIndex === 0 ? (
        <PersonalDetailsForm enabledNext={(value) => setEnableNextBtn(value)} />
      ) : activeIndex === 1 ? (
        <SummaryForm enabledNext={(value) => setEnableNextBtn(value)} />
      ) : activeIndex === 2 ? (
        <ExperienceForm enabledNext={(value) => setEnableNextBtn(value)} />
      ) : activeIndex === 3 ? (
        <EducationForm enabledNext={(value) => setEnableNextBtn(value)} />
      ) : (
        <SkillsForm />
      )}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  );
};

export default ResumeForm;
