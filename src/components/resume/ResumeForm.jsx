import React, { useState } from "react";
import { PersonalDetailsForm } from "./form/PersonalDetailsForm";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Home, LayoutGrid } from "lucide-react";
import SummaryForm from "./form/SummaryForm";
import ExperienceForm from "./form/ExperienceForm";
import EducationForm from "./form/EducationForm";
import SkillsForm from "./form/SkillsForm";
import UserResumeView from "@/pages/UserResumeView";
import { Link, Navigate, useParams } from "react-router-dom";
import ResumeTheme from "./ResumeTheme";

const ResumeForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { resumeId } = useParams();

  const [enableNextBtn, setEnableNextBtn] = useState(true);

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
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button className="bg-teal-600 text-white hover:bg-teal rounded">
              <Home />
            </Button>
          </Link>
          <ResumeTheme />
        </div>
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
      ) : activeIndex === 4 ? (
        <SkillsForm enabledNext={(value) => setEnableNextBtn(value)} />
      ) : activeIndex === 5 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  );
};

export default ResumeForm;
