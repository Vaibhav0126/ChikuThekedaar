import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../utils/api";
import { constructImageUrl, handleImageError } from "../utils/imageUtils";

// Import construction images for backgrounds
import construction4 from "../assets/images/construction-4.jpg";
import construction9 from "../assets/images/construction-9.jpg";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(getApiUrl("/api/projects"));
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <section
        className="relative bg-primary-600 text-white py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${construction4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Explore our portfolio of successful construction projects. Each
              project showcases our commitment to quality, innovation, and
              client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-accent-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No Projects Available
              </h2>
              <p className="text-gray-600">
                Projects will be displayed here once added by the admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <Link
                      to={`/projects/${project._id}`}
                      className="bg-accent-orange-500 text-white px-4 py-2 rounded hover:bg-accent-orange-600 transition-colors w-full inline-block text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative bg-primary-600 text-white py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${construction9})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Let us bring your vision to life with our expertise and dedication
            to excellence.
          </p>
          <Link
            to="/contact"
            className="bg-accent-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-orange-600 transition-colors inline-block"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
