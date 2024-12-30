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
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Label } from "../ui/label";

const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

const RichTextEditor = ({ onRichTextEditorChange }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const aiGeneratedSummary = async () => {
    setIsLoading(true);
    try {
      const prompt = PROMPT.replace("positionTitle", resumeInfo?.positionTitle);
      const result = await chatSession.sendMessage(prompt);
      console.log("AI Response Text: ", result.response.text());
      setAiSummary(JSON.parse(result.response.text()));
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
          type="button"
          onClick={aiGeneratedSummary}
          className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded"
        >
          <Sparkles />
          Summarize with AI
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
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
