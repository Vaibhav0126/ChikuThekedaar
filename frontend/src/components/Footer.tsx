import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LocationIcon } from "../assets/logos/location.svg";
import { ReactComponent as PhoneIcon } from "../assets/logos/phone.svg";
import { ReactComponent as EmailIcon } from "../assets/logos/email.svg";
import { ReactComponent as TwitterIcon } from "../assets/logos/twitter.svg";
import { ReactComponent as FacebookIcon } from "../assets/logos/facebook.svg";
import { ReactComponent as LinkedInIcon } from "../assets/logos/linkedin.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              CHHIKARA CONSTRUCTIONS
            </h3>
            <p className="text-neutral-300 mb-4">
              Crafting structures that last a lifetime — with precision and
              passion.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
              >
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
              >
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-accent-beige-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-neutral-400 hover:text-accent-beige-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-neutral-400 hover:text-accent-beige-500 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-accent-beige-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-400 hover:text-accent-beige-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5">
                  <LocationIcon className="w-full h-full" />
                </div>
                <span>D-1, Baraf Khana Road, Jhajjar-124103, Haryana</span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5 mr-3">
                  <PhoneIcon className="w-full h-full" />
                </div>
                <span>+91 858890900</span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5 mr-3">
                  <EmailIcon className="w-full h-full" />
                </div>
                <span>chhikaraconstructions@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 CHHIKARA CONSTRUCTIONS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
