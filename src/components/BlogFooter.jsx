import React from "react";
import {
  FiFacebook,
  FiGithub,
  FiRss,
  FiMail,
} from "react-icons/fi";
import { SiX } from "react-icons/si"; // X (Twitter) icon

const HomeFooter = ({ contactDetails = { mail: "nazim@example.com" } }) => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top: Brand */}
        <div className="flex flex-col items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-3xl font-extrabold tracking-wide text-blue-900">
              Nazim Aouni Blog
            </div>
            <p className="mt-1 text-sm uppercase tracking-widest text-gray-500">
              Thoughts • Code • Ideas
            </p>
          </div>
        </div>

        {/* Divider with navy accent */}
        <div className="mt-8 border-t-2 border-blue-900 w-24 mx-auto" />

        {/* Social Icons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {[
            { Icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nazim-aouni-3bb211332/" },
            { Icon: SiX, label: "X", href: "#" },
            { Icon: FiRss, label: "RSS", href: "#" },
            { Icon: FiGithub, label: "GitHub", href: "https://github.com/nazim-aouni" },
            { Icon: FiMail, label: "Email", href: `mn_aouni@esi.dz` },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center 
                         text-gray-700 hover:text-blue-900 hover:border-blue-900 hover:bg-blue-50 
                         transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
            >
              <Icon className="text-lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
