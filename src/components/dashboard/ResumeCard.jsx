import { EllipsisVertical, FileText, Loader } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ApiService from "@/service/ApiService";
import { useToast } from "@/hooks/use-toast";

const ResumeCard = ({ resume, refreshResumeList }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.deleteResumeById(resume?.documentId);
      if (response) {
        refreshResumeList();
        toast({
          variant: "success",
          description: "Resume deleted successfully!",
        });
        setOpenDialog(false);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={`/dashboard/resume/${resume.documentId}/edit`}
      className="w-full cursor-pointer"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between border-2 border-dashed border-teal-300 hover:shadow-xl hover:shadow-green-700 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
        {/* Icon and Resume Title Container */}
        <div className="flex items-center space-x-4 cursor-pointer">
          <FileText className="h-12 w-12 text-teal-600 dark:text-teal-400" />
          <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
            {resume.title}
          </h3>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="text-teal-600 dark:text-teal-400 hover:text-teal-800 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-teal-600 dark:bg-teal-800 dark:text-white cursor-pointer">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                navigate(`/my-resume/${resume?.documentId}/view`);
              }}
              className="cursor-pointer"
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                navigate(`/my-resume/${resume?.documentId}/view`);
              }}
              className="cursor-pointer"
            >
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* AlertDialog for Delete Confirmation */}
        <AlertDialog open={openDialog}>
          <AlertDialogContent className="bg-white dark:bg-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialog(false);
                }}
                className="cursor-pointer"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                className="cursor-pointer"
              >
                {isLoading ? <Loader className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Link>
  );
};

export default ResumeCard;
