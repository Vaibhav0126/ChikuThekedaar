import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../utils/api";
import { constructImageUrl, handleImageError } from "../utils/imageUtils";

// Import construction images for backgrounds
import construction1 from "../assets/images/construction-1.jpg";
import construction6 from "../assets/images/construction-6.jpg";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  status: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const [servicesRes, projectsRes] = await Promise.all([
          axios.get(getApiUrl("/api/services")),
          axios.get(getApiUrl("/api/projects")),
        ]);

        // Get first 3 services and projects for featured sections
        setFeaturedServices(servicesRes.data.slice(0, 3));
        setFeaturedProjects(projectsRes.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching featured data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 lg:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${construction1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
              Building Your Dreams <br />
              <span className="bg-gradient-to-r from-accent-orange-400 to-accent-beige-400 bg-clip-text text-transparent animate-gradient">
                With Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delay">
              Crafting structures that last a lifetime — with precision,
              passion, and professional expertise across Delhi NCR & Haryana.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delay-2">
              <Link
                to="/projects"
                className="group relative bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 hover:scale-105 text-lg transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Our Projects
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-orange-600 to-accent-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Link>
              <Link
                to="/services"
                className="group relative border-2 border-accent-beige-400 text-accent-beige-400 px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-accent-beige-400 hover:text-neutral-900 hover:scale-105 text-lg backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-beige-500/20 transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Our Services
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-accent-beige-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4a261' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative">
              Why Choose Chhikara Constructions?
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We deliver exceptional construction services with a commitment to
              quality, safety, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Quality Assurance
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We maintain the highest standards of quality in every project
                  we undertake, using premium materials and proven techniques.
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  On-Time Delivery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We respect your time and ensure all projects are completed
                  within the agreed timeline with efficient project management.
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-beige-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-accent-beige-500 to-accent-beige-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Expert Team
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our skilled professionals bring decades of experience to every
                  project, ensuring craftsmanship excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Featured Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From residential to commercial construction, we provide
              comprehensive building solutions tailored to your needs.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded mb-4"></div>
                    <div className="bg-gray-200 h-8 w-24 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={constructImageUrl(service.image)}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    onError={handleImageError}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <Link
                      to={`/services/${service._id}`}
                      className="bg-accent-orange-500 text-white px-4 py-2 rounded hover:bg-accent-orange-600 transition-colors inline-block"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Services Coming Soon
                </h3>
                <p className="text-gray-600">
                  We're preparing our comprehensive service offerings. Check
                  back soon!
                </p>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Services
              <svg
                className="ml-2 w-5 h-5"
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
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className="relative py-20 bg-primary-600 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${construction6})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow-lg relative">
              Our Construction Process
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We follow a systematic approach to ensure every project is
              completed with precision and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Progress line connecting the steps */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent hidden md:block"></div>
            <div className="text-center group relative">
              <div className="bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white/20">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Planning & Design
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  We work closely with you to understand your vision and create
                  detailed plans.
                </p>
              </div>
            </div>

            <div className="text-center group relative">
              <div className="bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white/20">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Material Selection
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  We source high-quality materials and obtain permits for your
                  project.
                </p>
              </div>
            </div>

            <div className="text-center group relative">
              <div className="bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white/20">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Construction
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  Our expert team executes the project with precision and
                  regular progress updates.
                </p>
              </div>
            </div>

            <div className="text-center group relative">
              <div className="bg-gradient-to-br from-accent-orange-500 to-accent-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white/20">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Final Inspection
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  We conduct thorough quality checks and hand over your
                  completed project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f4a261' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-orange-400 to-accent-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                4+
              </div>
              <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                Projects Completed
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-accent-orange-500 to-transparent rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-orange-400 to-accent-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                On-Time Delivery
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-accent-orange-500 to-transparent rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-orange-400 to-accent-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                Client Satisfaction
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-accent-orange-500 to-transparent rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent-orange-400 to-accent-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                Support Available
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-accent-orange-500 to-transparent rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-mesh relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative">
              Ready to Start Your Project?
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Contact us today for a free consultation and let us help you build
              your dreams with our expert construction services.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="animate-pulse">
                    <div className="bg-gray-200 h-64 w-full"></div>
                    <div className="p-6">
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-3 rounded mb-4"></div>
                      <div className="bg-gray-200 h-8 w-24 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project._id}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-200 relative"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={constructImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <Link
                      to={`/projects/${project._id}`}
                      className="group/btn bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 text-white px-6 py-3 rounded-xl hover:from-accent-orange-600 hover:to-accent-orange-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
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
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-neutral-50 rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Projects Coming Soon
                </h3>
                <p className="text-gray-600">
                  We're showcasing our latest construction projects. Check back
                  soon!
                </p>
              </div>
            </div>
          )}

          <div className="text-center mt-12 mb-6">
            <Link
              to="/projects"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Projects
              <svg
                className="ml-2 w-5 h-5"
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
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <Link
            to="/contact"
            className="group relative bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 hover:scale-105 text-lg transform hover:-translate-y-1 "
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Free Consultation
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-orange-600 to-accent-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </Link>
          <Link
            to="/about"
            className="group relative border-2 border-orange-500 text-orange-500 px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105 text-lg backdrop-blur-sm bg-white/60 shadow-xl hover:shadow-orange-500/20 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Learn About Us
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
