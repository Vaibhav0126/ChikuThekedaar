import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as InstagramIcon } from "../assets/logos/instagram.svg";
import { ReactComponent as LinkedInIcon } from "../assets/logos/linkedin.svg";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CHHIKARA CONSTRUCTIONS
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Building excellence for over two decades with passion, precision,
              and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-accent-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
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
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={require("../assets/images/Company.jpg")}
                alt="Construction site"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are
              as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every project is executed with
                precision and attention to detail.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Client-Focused</h3>
              <p className="text-gray-600">
                Your vision is our mission. We work closely with clients to
                exceed expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and methods to deliver cutting-edge
                solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-accent-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who lead our company and drive
              our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={require("../assets/images/Vishal.jpg")}
                alt="Vishal Chhikara"
                className="w-full h-64 object-cover object-top"
              />
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

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={require("../assets/images/Vaibhav.jpg")}
                alt="Vaibhav"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                      Vaibhav
                    </h3>
                    <div className="flex space-x-3">
                      {/* LinkedIn */}
                      <a
                        href="#"
                        className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-primary-600 mb-3">CTO</p>
                </div>
                <p className="text-gray-600">
                  With experience in full-stack development and a background as
                  a software engineer in Japan, Vaibhav now leads the tech
                  vision at Chhikara Constructions.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={require("../assets/images/kuki.jpg")}
                alt="Saijal"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold mb-2 sm:mb-0">
                      Saijal
                    </h3>
                    <div className="flex space-x-3">
                      {/* LinkedIn */}
                      <a
                        href="https://in.linkedin.com/in/"
                        className="text-accent-orange-500 hover:text-accent-orange-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <p className="text-primary-600 mb-3">Legal Advisor</p>
                </div>
                <p className="text-gray-600">
                  Provides legal guidance with a sharp mind and passion for
                  travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary-600 text-white">
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
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
