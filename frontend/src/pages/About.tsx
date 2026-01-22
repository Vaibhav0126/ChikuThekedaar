import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LinkedInIcon } from "../assets/logos/linkedin.svg";

// Import construction images for backgrounds
import construction2 from "../assets/images/construction-2.jpg";
import construction7 from "../assets/images/construction-7.jpg";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section
        className="relative bg-primary-600 text-white py-12 sm:py-20 lg:py-28"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${construction2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-shadow-lg leading-tight">
              About CHHIKARA CONSTRUCTIONS
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Building excellence for over two decades with passion, precision,
              and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-accent-beige-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4a261' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative">
                Our Story
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full"></div>
              </h2>
              <p className="text-gray-600 mb-6">
                CHHIKARA CONSTRUCTIONS was founded with a clear vision — to
                redefine how construction is delivered in India. Our founder and
                CEO, Vishal Chhikara, holds a Bachelor's degree in Civil
                Engineering from DCRUST Murthal and a Master's from IIT Ropar.
              </p>
              <p className="text-gray-600 mb-6">
                Rather than joining an existing firm, he chose a different path
                — one where he could lead innovation and uphold the highest
                standards in the industry. Driven by this vision, he laid the
                foundation for Chhikara Constructions.
              </p>
              <p className="text-gray-600">
                Though a young firm, our team is committed to precision,
                transparency, and delivering value that stands the test of time.
                We approach every project — big or small — with a deep sense of
                responsibility and a passion for building the future, the right
                way.
              </p>
            </div>
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={require("../assets/images/Company.jpg")}
                alt="Construction site"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-mesh relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative">
              Our Values
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do and define who we are
              as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200 relative overflow-hidden">
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
                  Quality First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We never compromise on quality. Every project is executed with
                  precision and attention to detail.
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Client-Focused
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your vision is our mission. We work closely with clients to
                  exceed expectations.
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We embrace new technologies and methods to deliver
                  cutting-edge solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-accent-beige-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative">
              Our Team
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-accent-orange-500 to-accent-beige-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the experienced professionals who lead our company and drive
              our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <img
                  src={require("../assets/images/Vishal.jpg")}
                  alt="Vishal Chhikara"
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                      Vishal Chhikara
                    </h3>
                    <div className="flex space-x-3">
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/vishal-chhikara-2b1544260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-primary-600 mb-3">CEO & Founder</p>
                </div>
                <p className="text-gray-600">
                  A visionary Civil engineer from IIT Ropar, leading the firm
                  with purpose, precision, and a passion for quality.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <img
                  src={require("../assets/images/Vaibhav.jpg")}
                  alt="Vaibhav"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                      Vaibhav
                    </h3>
                    <div className="flex space-x-3">
                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/vaibhav-27singh"
                        className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-primary-600 mb-3">Digital Strategist</p>
                </div>
                <p className="text-gray-600">
                  With experience in full-stack development and a background as
                  a software engineer in Japan, Vaibhav now leads the tech
                  vision at Chhikara Constructions.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <img
                  src={require("../assets/images/Rim.jpeg")}
                  alt="Rim"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                      Rimjhim Keer
                    </h3>
                    <div className="flex space-x-3">
                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/rimjhimkeer/"
                        className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-primary-600 mb-3">UI/UX Designer</p>
                </div>
                <p className="text-gray-600">
                  A creative UI/UX designer who brings innovative design solutions
                  to life. Crafts intuitive and visually appealing user experiences
                  with a keen eye for detail and modern design principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="relative py-20 bg-primary-600 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${construction7})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can bring your vision to
            life.
          </p>
          <Link
            to="/contact"
            className="group relative bg-gradient-to-r from-accent-orange-500 to-accent-orange-600 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 hover:scale-105 text-lg transform hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get In Touch
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
        </div>
      </section>
    </div>
  );
};

export default About;
