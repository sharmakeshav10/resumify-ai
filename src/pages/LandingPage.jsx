import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
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
import FeatureCard from "@/components/landingpage/FeatureCard";
import StepCard from "@/components/landingpage/StepCard";
import Footer from "@/components/common/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      <Header />
      <motion.section
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Create Your Perfect Resume with AI
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Craft a professional, tailored resume in minutes with our
                advanced AI-powered resume builder.
              </motion.p>
            </div>
            <div className="space-x-4">
              {isSignedIn ? (
                <Link to={"/dashboard"}>
                  <Button className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to={"/auth/sign-in"}>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                    onClick={() => router.push("/dashboard")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}

              <Button
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-teal-50 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="container px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600 dark:from-teal-400 dark:to-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <FeatureCard
                icon={
                  <Zap className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                }
                title="AI-Powered Writing"
                description="Our advanced AI analyzes your experience and skills to create compelling content."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <FeatureCard
                icon={
                  <FileText className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                }
                title="Multiple Templates"
                description="Choose from a variety of professional templates to suit your industry and style."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <FeatureCard
                icon={
                  <CheckCircle className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                }
                title="ATS-Friendly"
                description="Ensure your resume passes Applicant Tracking Systems with our optimized formats."
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* how it works section */}
      <motion.section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="container px-4 md:px-6">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600 dark:from-teal-400 dark:to-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <StepCard
                number={1}
                title="Input Your Information"
                description="Enter your work experience, education, and skills."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <StepCard
                number={2}
                title="AI Generates Content"
                description="Our AI crafts compelling descriptions and highlights your achievements."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <StepCard
                number={3}
                title="Customize and Download"
                description="Fine-tune your resume and download it in your preferred format."
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-600 to-orange-600 dark:from-teal-500 dark:to-orange-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                Ready to Build Your Perfect Resume?
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-teal-100 md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
              >
                Join thousands of job seekers who have successfully landed their
                dream jobs with ResumeAI.
              </motion.p>
            </div>
            {isSignedIn ? (
              <Link to={"/dashboard"}>
                <Button className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to={"/auth/sign-in"}>
                <Button
                  className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default LandingPage;
