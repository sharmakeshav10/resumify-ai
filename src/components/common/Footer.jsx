import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-teal-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 ResumifyAI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Github
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
