import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LocationIcon } from "../assets/logos/location.svg";
import { ReactComponent as PhoneIcon } from "../assets/logos/phone.svg";
import { ReactComponent as EmailIcon } from "../assets/logos/email.svg";
import { ReactComponent as LinkedInIcon } from "../assets/logos/linkedin.svg";
import { ReactComponent as InstagramIcon } from "../assets/logos/instagram.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f4a261' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CHHIKARA CONSTRUCTIONS
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full mb-4"></div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Crafting structures that last a lifetime — with precision,
                passion, and professional excellence.
              </p>
            </div>

            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/chhikara_constructions?igsh=MWdpMmYxYjhiODljeg=="
                className="group bg-gray-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="#"
                className="group bg-gray-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative text-white">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-accent-orange-500 to-transparent rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/projects", label: "Projects" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-neutral-400 hover:text-accent-beige-500 transition-all duration-300 hover:translate-x-1"
                  >
                    <svg
                      className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative text-white">
              Contact Info
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-accent-orange-500 to-transparent rounded-full"></div>
            </h4>

            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <LocationIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>D-1, Baraf Khana Road, Jhajjar-124103, Haryana</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="w-4 h-4 " />

                <span className="text-neutral-400 group-hover:text-white transition-colors duration-300 ml-3">
                  +91 8588890900
                </span>
              </li>
              <li className="flex items-start">
                <EmailIcon className="w-4 h-4 " />
                <span className="text-neutral-400 group-hover:text-white transition-colors duration-300 ml-3 text-sm md:text-base">
                  chhikaraconstructions@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700/50 mt-12 pt-8 text-center text-neutral-400">
          <p className="leading-relaxed">
            &copy; 2025 CHHIKARA CONSTRUCTIONS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
