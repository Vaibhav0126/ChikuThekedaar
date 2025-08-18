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
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 hover:text-orange-300 transition-colors">
                  <Phone className="h-4 w-4 text-orange-400" />
                  <span>+91 8588890900</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-orange-400"></div>
                <div className="flex items-center space-x-2 hover:text-orange-300 transition-colors">
                  <Mail className="h-4 w-4 text-orange-400" />
                  <span>chhikaraconstructions@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 hover:text-orange-300 transition-colors">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>Delhi NCR & Haryana</span>
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
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent-orange-400 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-orange-500"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-600 border-t border-primary-500">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-accent-orange-500 bg-primary-700"
                      : "text-white hover:text-accent-orange-400 hover:bg-primary-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
