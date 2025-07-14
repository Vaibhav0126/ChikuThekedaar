import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../utils/api";

interface Service {
  _id: string;
  title: string;
  description: string;
  detailDescription: string;
  image: string;
  images: string[];
  createdAt: string;
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(getApiUrl(`/api/services/${id}`));
        setService(response.data);
        setSelectedImage(response.data.image || response.data.images[0] || "");
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Service Not Found
          </h2>
          <Link
            to="/services"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(service.image ? [service.image] : []),
    ...service.images,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/services"
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
            Back to Services
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={selectedImage || "/api/placeholder/600/400"}
                alt={service.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
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
                      src={image || "/api/placeholder/150/150"}
                      alt={`${service.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {service.description}
              </p>
            </div>

            {/* Detailed Description */}
            {service.detailDescription && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Service Details
                </h2>
                <div className="prose prose-primary max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {service.detailDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Service Features */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                What We Offer
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Professional and experienced team
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  High-quality materials and tools
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Timely project completion
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Competitive pricing
                </li>
                <li className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-primary-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Warranty and after-service support
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-accent-beige-50 p-6 rounded-lg border border-accent-beige-200">
              <h3 className="text-lg font-semibold text-primary-600 mb-2">
                Interested in this service?
              </h3>
              <p className="text-neutral-700 mb-4">
                Contact us today for a free consultation and quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="bg-accent-orange-500 text-white px-6 py-2 rounded-lg hover:bg-accent-orange-600 transition-colors text-center"
                >
                  Get Free Quote
                </Link>
                <a
                  href="tel:+918588909000"
                  className="border border-accent-orange-500 text-accent-orange-500 px-6 py-2 rounded-lg hover:bg-accent-orange-500 hover:text-white transition-colors text-center"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Other Services
          </h2>
          <div className="text-center">
            <Link
              to="/services"
              className="bg-accent-orange-500 text-white px-8 py-3 rounded-lg hover:bg-accent-orange-600 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
