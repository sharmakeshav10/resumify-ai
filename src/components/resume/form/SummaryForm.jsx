import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/ResumeContext";
import ApiService from "@/service/ApiService";
import { Loader, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, useToast } from "@/hooks/use-toast";
import { chatSession } from "@/service/AiService";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

const SummaryForm = ({ enabledNext }) => {
  const { resumeInfo, updateResume } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState();
  const [aiSummary, setAiSummary] = useState();
  const { resumeId } = useParams();

  const { toast } = useToast();

  useEffect(() => {
    summary &&
      updateResume({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const aiGeneratedSummary = async () => {
    setIsLoading(true);
    try {
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
      const result = await chatSession.sendMessage(PROMPT);

      const responseText = result.response.text();
      console.log("AI Response Text: ", responseText);

      // Parse the response and access the 'summaries' array
      const parsedResponse = JSON.parse(responseText);
      console.log("Parsed AI Response: ", parsedResponse);

      setAiSummary(parsedResponse);
      setIsLoading(false);
    } catch (e) {
      console.log("AI couldn't generate summary due to: ", e);
      setIsLoading(false);
    }
  };

  const handleSummaryChange = (e) => {
    enabledNext(false);
    console.log(e.target.value);

    setSummary(e.target.value);

    updateResume({
      ...resumeInfo,
      summary: summary,
    });
  };

  const handleSaveSummary = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        data: {
          summary: summary,
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
          description: "Summary updated successfully!",
        });
      }
    } catch (e) {
      console.log("Could not update the summary:", e);

      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="border shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="font-bold text-2xl ">About Me</h2>
        <p className="font-semibold text-lg  mt-1">Tell Us About Yourself</p>

        <form onSubmit={handleSaveSummary} className="mt-6">
          <div className="flex justify-between items-end">
            <p>Add Summary</p>
            <Button
              variant="outline"
              type="button"
              onClick={aiGeneratedSummary}
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
            >
              <Sparkles />
              Summarize with AI
            </Button>
          </div>
          <Textarea
            onChange={handleSummaryChange}
            required
            name="summary"
            value={summary}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-600 mt-5"
          />

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

      {aiSummary && aiSummary.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiSummary?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SummaryForm;
