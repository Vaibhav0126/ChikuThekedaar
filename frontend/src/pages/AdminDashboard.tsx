import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUpload";

interface Service {
  _id: string;
  title: string;
  description: string;
  detailDescription: string;
  image: string;
  images: string[];
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  detailDescription: string;
  image: string;
  images: string[];
  category: string;
  location: string;
  client: string;
  status: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"services" | "projects">(
    "services"
  );
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"service" | "project">("service");
  const [editingItem, setEditingItem] = useState<Service | Project | null>(
    null
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailDescription: "",
    image: "",
    images: [] as string[],
    category: "",
    location: "",
    client: "",
    status: "completed",
    startDate: "",
    endDate: "",
  });

  // Optimize image upload callback to prevent unnecessary re-renders
  const handleImagesUploaded = useCallback((urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: urls,
      image: urls.length > 0 ? urls[0] : prev.image,
    }));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [servicesRes, projectsRes] = await Promise.all([
        axios.get("http://localhost:5001/api/services", config),
        axios.get("http://localhost:5001/api/projects", config),
      ]);

      setServices(servicesRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const openModal = (type: "service" | "project", item?: Service | Project) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);

    if (item) {
      const images = item.images || [];
      setFormData({
        title: item.title,
        description: item.description,
        detailDescription: item.detailDescription || "",
        image: images.length > 0 ? images[0] : item.image, // Use first uploaded image as primary
        images: images,
        category: "category" in item ? item.category : "",
        location: "location" in item ? item.location || "" : "",
        client: "client" in item ? item.client || "" : "",
        status: "status" in item ? item.status || "completed" : "completed",
        startDate: "startDate" in item ? item.startDate || "" : "",
        endDate: "endDate" in item ? item.endDate || "" : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        detailDescription: "",
        image: "",
        images: [],
        category: "",
        location: "",
        client: "",
        status: "completed",
        startDate: "",
        endDate: "",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      detailDescription: "",
      image: "",
      images: [],
      category: "",
      location: "",
      client: "",
      status: "completed",
      startDate: "",
      endDate: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const endpoint = modalType === "service" ? "services" : "projects";
      const url = `http://localhost:5001/api/${endpoint}`;

      if (editingItem) {
        await axios.put(`${url}/${editingItem._id}`, formData, config);
        toast.success(`${modalType} updated successfully!`);
      } else {
        await axios.post(url, formData, config);
        toast.success(`${modalType} created successfully!`);
      }

      fetchData();
      closeModal();
    } catch (error: any) {
      console.error("Form submission error:", error);
      console.error("Error details:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? error.response.data.errors.map((err: any) => err.msg).join(", ")
          : `Failed to save ${modalType}`);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (type: "service" | "project", id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`))
      return;

    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const endpoint = type === "service" ? "services" : "projects";
      await axios.delete(`http://localhost:5001/api/${endpoint}/${id}`, config);

      toast.success(`${type} deleted successfully!`);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to delete ${type}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("services")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "services"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "projects"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Projects
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mb-6">
          <button
            onClick={() =>
              openModal(activeTab === "services" ? "service" : "project")
            }
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Add New {activeTab === "services" ? "Service" : "Project"}
          </button>
        </div>

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={service.image || "/api/placeholder/400/200"}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/400/200";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => openModal("service", service)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("service", service._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={project.image || "/api/placeholder/400/200"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/400/200";
                  }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded text-xs">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => openModal("project", project)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("project", project._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-8 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingItem ? "Edit" : "Add"}{" "}
                {modalType === "service" ? "Service" : "Project"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Category (only for projects) */}
                  {modalType === "project" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., Residential, Commercial"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    rows={3}
                    required
                  />
                </div>

                {/* Detail Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    value={formData.detailDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        detailDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    placeholder="Detailed description for the detail page"
                  />
                </div>

                {/* Image Gallery */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Images
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    The first image will be used as the main image for the
                    project.
                  </p>
                  <ImageUpload
                    onImagesUploaded={handleImagesUploaded}
                    existingImages={formData.images}
                    maxFiles={10}
                  />
                </div>

                {/* Project-specific fields */}
                {modalType === "project" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="City, State"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client
                      </label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) =>
                          setFormData({ ...formData, client: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Client Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="planned">Planned</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
