import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logos/logo.svg";
import { ReactComponent as Phone } from "../assets/logos/phone.svg";
import { ReactComponent as Mail } from "../assets/logos/email.svg";
import { ReactComponent as MapPin } from "../assets/logos/location.svg";

// Import construction images
import construction1 from "../assets/images/construction-1.jpg";
import construction2 from "../assets/images/construction-2.jpg";
import construction3 from "../assets/images/construction-3.jpg";
import construction4 from "../assets/images/construction-4.jpg";
import construction5 from "../assets/images/construction-5.jpg";
import construction8 from "../assets/images/construction-8.jpg";
import construction9 from "../assets/images/construction-9.jpg";
import construction10 from "../assets/images/construction-10.jpg";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Hero images mapping based on route
  const heroImages: Record<string, string> = {
    "/": construction1,
    "/services": construction3,
    "/projects": construction4,
    "/about": construction2,
    "/contact": construction5,
  };

  // Additional images for dynamic routes and admin pages
  const additionalImages: Record<string, string> = {
    "/admin": construction8,
    "/admin/dashboard": construction9,
    "/admin/login": construction10,
  };

  const isActive = (path: string) => location.pathname === path;

  // Get hero image for current route
  const getHeroImage = () => {
    // Check exact path first
    if (heroImages[location.pathname]) {
      return heroImages[location.pathname];
    }
    // Check additional images
    if (additionalImages[location.pathname]) {
      return additionalImages[location.pathname];
    }
    // Check if it's a dynamic route (e.g., /services/:id, /projects/:id)
    if (location.pathname.startsWith("/services"))
      return heroImages["/services"];
    if (location.pathname.startsWith("/projects"))
      return heroImages["/projects"];
    if (location.pathname.startsWith("/admin")) return construction8;
    // Default to home image
    return heroImages["/"];
  };

  return (
    <>
      <header className="bg-neutral-900 shadow-lg sticky top-0 z-50">
        <div
          className="relative text-white py-3 border-b-2 border-orange-500"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${getHeroImage()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <div className="flex items-center space-x-3 sm:space-x-6">
                <div className="flex items-center space-x-1 sm:space-x-2 hover:text-orange-300 transition-colors">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                  <span>+91 8588890900</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-orange-400"></div>
                <div className="hidden md:flex items-center space-x-1 sm:space-x-2 hover:text-orange-300 transition-colors">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                  <span className="truncate max-w-[160px] lg:max-w-none">
                    chhikaraconstructions@gmail.com
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 hover:text-orange-300 transition-colors">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
                <span className="hidden sm:inline">Delhi NCR & Haryana</span>
                <span className="sm:hidden">Delhi NCR</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center ">
                {/* Construction Logo */}
                <Logo className="h-10 w-10 md:h-16 md:w-16" />
                <span className="text-lg md:text-2xl font-bold text-white ml-2 md:ml-3">
                  <span className="hidden sm:inline">
                    CHHIKARA CONSTRUCTIONS
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-accent-orange-500 bg-primary-700"
                      : "text-white hover:text-accent-orange-400 hover:bg-primary-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white bg-neutral-800/50 hover:bg-orange-500/20 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 backdrop-blur-sm border border-neutral-700/50"
                aria-label="Toggle main menu"
              >
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-200">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-b from-neutral-800 to-neutral-900 border-t border-orange-500/30 shadow-xl">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                    isActive(item.path)
                      ? "text-orange-400 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-l-4 border-orange-400 shadow-lg"
                      : "text-white hover:text-orange-300 hover:bg-gradient-to-r hover:from-neutral-700/50 hover:to-neutral-600/50 border-l-4 border-transparent hover:border-orange-500/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isActive(item.path) ? "bg-orange-400" : "bg-neutral-500"
                      } transition-colors duration-200`}
                    ></div>
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}

              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-neutral-700/50">
                <div className="px-4 py-2">
                  <p className="text-xs text-neutral-400 mb-2">Quick Contact</p>
                  <a
                    href="tel:+918588890900"
                    className="flex items-center space-x-2 text-orange-300 hover:text-orange-200 transition-colors duration-200 active:scale-95 transform"
                  >
                    <Phone className="h-3 w-3" />
                    <span className="text-sm">+91 8588890900</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
