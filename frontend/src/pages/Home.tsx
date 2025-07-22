import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../utils/api";
import { constructImageUrl, handleImageError } from "../utils/imageUtils";

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
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Building Your Dreams <br />
              <span className="text-primary-200">With Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto">
              Crafting structures that last a lifetime — with precision,
              passion, and professional expertise across Delhi NCR & Haryana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="bg-accent-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange-600 transition-colors shadow-lg text-lg"
              >
                View Our Projects
              </Link>
              <Link
                to="/services"
                className="border-2 border-accent-beige-500 text-accent-beige-500 px-8 py-4 rounded-lg font-semibold hover:bg-accent-beige-500 hover:text-primary-600 transition-colors text-lg"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Chhikara Constructions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional construction services with a commitment to
              quality, safety, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
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
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                We maintain the highest standards of quality in every project we
                undertake, using premium materials and proven techniques.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-accent-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-accent-orange-600"
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
              <h3 className="text-xl font-semibold mb-4">On-Time Delivery</h3>
              <p className="text-gray-600">
                We respect your time and ensure all projects are completed
                within the agreed timeline with efficient project management.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-accent-beige-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-accent-beige-600"
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
              <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our skilled professionals bring decades of experience to every
                project, ensuring craftsmanship excellence.
              </p>
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
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Construction Process
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We follow a systematic approach to ensure every project is
              completed with precision and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-accent-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Planning & Design</h3>
              <p className="text-primary-100">
                We work closely with you to understand your vision and create
                detailed plans.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Material Selection</h3>
              <p className="text-primary-100">
                We source high-quality materials and obtain necessary permits
                for your project.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Construction</h3>
              <p className="text-primary-100">
                Our expert team executes the project with precision and regular
                progress updates.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Final Inspection</h3>
              <p className="text-primary-100">
                We conduct thorough quality checks and hand over your completed
                project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange-500">
                4+
              </div>
              <div className="text-gray-300 text-lg">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange-500">
                100%
              </div>
              <div className="text-gray-300 text-lg">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange-500">
                100%
              </div>
              <div className="text-gray-300 text-lg">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-orange-500">
                24/7
              </div>
              <div className="text-gray-300 text-lg">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={constructImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                    onError={handleImageError}
                  />
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
                      className="bg-accent-orange-500 text-white px-4 py-2 rounded hover:bg-accent-orange-600 transition-colors inline-block"
                    >
                      View Details
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

          <div className="text-center mt-12">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Link
            to="/contact"
            className="bg-accent-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-orange-600 transition-colors inline-block shadow-lg text-lg"
          >
            Get Free Consultation
          </Link>
          <Link
            to="/about"
            className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-lg"
          >
            Learn About Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
