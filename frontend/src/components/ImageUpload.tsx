import React, { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getApiUrl, getApiBaseUrl } from "../utils/api";

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  maxFiles?: number;
  existingImages?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesUploaded,
  maxFiles = 10,
  existingImages = [],
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] =
    useState<string[]>(existingImages);

  // Update local state when existingImages changes (but prevent infinite loops)
  React.useEffect(() => {
    if (JSON.stringify(existingImages) !== JSON.stringify(uploadedImages)) {
      setUploadedImages(existingImages);
    }
  }, [existingImages]);

  const handleFiles = useCallback(
    async (files: FileList) => {
      const fileArray = Array.from(files);

      // Filter only image files
      const imageFiles = fileArray.filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length === 0) {
        toast.error("Please select only image files");
        return;
      }

      if (uploadedImages.length + imageFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} images`);
        return;
      }

      setUploading(true);

      try {
        const formData = new FormData();
        imageFiles.forEach((file) => {
          formData.append("images", file);
        });

        const token = localStorage.getItem("adminToken");
        const response = await axios.post(
          getApiUrl("/api/upload/multiple"),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Construct full URLs for the uploaded images
        const newUrls = response.data.urls.map((url: string) =>
          url.startsWith("http") ? url : `${getApiBaseUrl()}${url}`
        );
        const updatedImages = [...uploadedImages, ...newUrls];
        setUploadedImages(updatedImages);
        onImagesUploaded(updatedImages);

        toast.success(`${newUrls.length} image(s) uploaded successfully`);
      } catch (error: any) {
        console.error("Upload error:", error);
        toast.error(error.response?.data?.message || "Failed to upload images");
      } finally {
        setUploading(false);
      }
    },
    [uploadedImages, maxFiles, onImagesUploaded]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      // Only set drag inactive if we're leaving the drop zone completely
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setDragActive(false);
      }
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = async (imageUrl: string, index: number) => {
    try {
      // Extract filename from URL
      const filename = imageUrl.split("/").pop();
      if (filename) {
        const token = localStorage.getItem("adminToken");
        await axios.delete(getApiUrl(`/api/upload/${filename}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const updatedImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(updatedImages);
      onImagesUploaded(updatedImages);
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Failed to remove image");
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragActive
            ? "border-primary-500 bg-primary-50 scale-105"
            : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />

        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {uploading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <p className="text-sm text-gray-600 ml-2">Uploading images...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary-600">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB each
              </p>
              <p className="text-xs text-gray-500">
                {uploadedImages.length}/{maxFiles} images uploaded
              </p>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uploadedImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  // Fallback for image load errors
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/100/100";
                }}
              />
              <button
                onClick={() => removeImage(imageUrl, index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
