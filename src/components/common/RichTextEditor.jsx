import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast, useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Loader, Sparkles } from "lucide-react";
import { Label } from "../ui/label";
import { useResume } from "@/context/ResumeContext";
import { chatSession } from "@/service/AiService";

const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

const RichTextEditor = ({
  onRichTextEditorChange,
  index,
  defaultValue,
  enabledNext,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const { resumeInfo, updateResume } = useResume();

  const { toast } = useToast();

  const aiGeneratedSummary = async () => {
    setIsLoading(true);
    try {
      if (!resumeInfo?.experience[index]?.title) {
        toast({
          variant: "destructive",
          description: "Please add a job title!",
        });
        setIsLoading(false);
        return;
      }
      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo?.experience[index]?.title
      );
      const result = await chatSession.sendMessage(prompt);
      console.log("AI Response Text: ", result.response.text());
      const resp = result.response.text();
      const cleanedResponse = resp
        .replace(/[\{\}"]/g, "") // Remove curly braces and quotes
        .replace(/position_title: /g, "") // Remove the "position_title" part
        .replace(/bullet_points: /g, "") // Remove the "bullet_points" part
        .replace(/(\n\s*)+/g, "\n") // Normalize line breaks (remove extra spaces and line breaks)
        .trim(); // Remove any extra spaces from the beginning or end
      setValue(cleanedResponse);
      setIsLoading(false);
    } catch (e) {
      console.log("AI couldnt generate summary due to: ", e);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <Label className="text-xs">Work Summary</Label>

        <Button
          variant="outline"
          disabled={isLoading}
          type="button"
          onClick={aiGeneratedSummary}
          className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
        >
          {isLoading ? <Loader className="animate-spin" /> : <Sparkles />}
          {isLoading ? "Summarizing" : "Summarize with AI"}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            enabledNext(false);
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
