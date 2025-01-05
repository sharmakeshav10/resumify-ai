import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/clerk-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FeatureCard from "@/components/landingpage/FeatureCard";
import StepCard from "@/components/landingpage/StepCard";
import Footer from "@/components/common/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create Your Perfect Resume with AI
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Craft a professional, tailored resume in minutes with our
                advanced AI-powered resume builder.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                onClick={() => router.push("/dashboard")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-teal-50 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600 dark:from-teal-400 dark:to-orange-400">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <Zap className="h-10 w-10 text-teal-600 dark:text-teal-400" />
              }
              title="AI-Powered Writing"
              description="Our advanced AI analyzes your experience and skills to create compelling content."
            />
            <FeatureCard
              icon={
                <FileText className="h-10 w-10 text-teal-600 dark:text-teal-400" />
              }
              title="Multiple Templates"
              description="Choose from a variety of professional templates to suit your industry and style."
            />
            <FeatureCard
              icon={
                <CheckCircle className="h-10 w-10 text-teal-600 dark:text-teal-400" />
              }
              title="ATS-Friendly"
              description="Ensure your resume passes Applicant Tracking Systems with our optimized formats."
            />
          </div>
        </div>
      </section>

      {/* how it works section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600 dark:from-teal-400 dark:to-orange-400">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Input Your Information"
              description="Enter your work experience, education, and skills."
            />
            <StepCard
              number={2}
              title="AI Generates Content"
              description="Our AI crafts compelling descriptions and highlights your achievements."
            />
            <StepCard
              number={3}
              title="Customize and Download"
              description="Fine-tune your resume and download it in your preferred format."
            />
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-600 to-orange-600 dark:from-teal-500 dark:to-orange-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Build Your Perfect Resume?
              </h2>
              <p className="mx-auto max-w-[700px] text-teal-100 md:text-xl">
                Join thousands of job seekers who have successfully landed their
                dream jobs with ResumeAI.
              </p>
            </div>
            <Button className="bg-white text-teal-600 hover:bg-teal-50 dark:bg-teal-950 dark:text-teal-400 dark:hover:bg-teal-900">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
