import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  constructImageUrl,
  constructImageUrls,
  handleImageError,
} from "../utils/imageUtils";
import { getApiUrl } from "../utils/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  detailDescription: string;
  image: string;
  images: string[];
  category: string;
  status: string;
  location: string;
  client: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(getApiUrl(`/api/projects/${id}`));
        setProject(response.data);
        const primaryImage =
          response.data.images?.[0] || response.data.image || "";
        setSelectedImage(constructImageUrl(primaryImage));
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Project Not Found
          </h2>
          <Link
            to="/projects"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Combine images and remove duplicates
  const uniqueImageUrls = Array.from(
    new Set(
      [
        ...(project.images || []),
        ...(project.image ? [project.image] : []),
      ].filter(Boolean)
    )
  );

  const allImages = constructImageUrls(uniqueImageUrls);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/projects"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600">{project.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Image Gallery - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={selectedImage || constructImageUrl("")}
                alt={project.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                onError={handleImageError}
              />
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image
                        ? "border-primary-600 ring-2 ring-primary-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Information Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Project Information
              </h2>

              {project.client && (
                <div className="mb-4">
                  <dt className="text-sm font-medium text-gray-500">Client</dt>
                  <dd className="text-sm text-gray-900">{project.client}</dd>
                </div>
              )}

              {project.location && (
                <div className="mb-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Location
                  </dt>
                  <dd className="text-sm text-gray-900 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {project.location}
                  </dd>
                </div>
              )}

              <div className="mb-4">
                <dt className="text-sm font-medium text-gray-500">
                  Start Date
                </dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(project.startDate)}
                </dd>
              </div>

              {project.endDate && (
                <div className="mb-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Completion Date
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(project.endDate)}
                  </dd>
                </div>
              )}

              <div className="mb-4">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="text-sm text-gray-900">{project.category}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                </dd>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-accent-beige-50 p-6 rounded-lg border border-accent-beige-200">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">
                Interested in a similar project?
              </h3>
              <p className="text-neutral-700 mb-4">
                Contact us to discuss your construction needs and get a free
                consultation.
              </p>
              <Link
                to="/contact"
                className="w-full bg-accent-orange-500 text-white px-6 py-2 rounded-lg hover:bg-accent-orange-600 transition-colors inline-block text-center"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {project.detailDescription && (
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Project Details
            </h2>
            <div className="prose prose-primary max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {project.detailDescription}
              </p>
            </div>
          </div>
        )}

        {/* Related Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore More Projects
          </h2>
          <div className="text-center">
            <Link
              to="/projects"
              className="bg-accent-orange-500 text-white px-8 py-3 rounded-lg hover:bg-accent-orange-600 transition-colors inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
