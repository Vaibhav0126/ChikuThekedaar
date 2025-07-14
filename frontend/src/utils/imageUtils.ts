/**
 * Constructs a full image URL from a relative path
 * @param imagePath - The image path (relative or absolute)
 * @returns Full image URL or fallback placeholder
 */
export const constructImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return "/api/placeholder/400/300";
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it's a relative path, construct the full URL
  if (imagePath.startsWith("/uploads/")) {
    return `http://localhost:5001${imagePath}`;
  }

  // If it's just a filename, construct the full path
  if (!imagePath.startsWith("/")) {
    return `http://localhost:5001/uploads/${imagePath}`;
  }

  return imagePath;
};

/**
 * Handles image load errors by setting a fallback image
 * @param e - The error event
 * @param fallbackUrl - Optional fallback URL
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl?: string
): void => {
  const target = e.target as HTMLImageElement;
  target.src = fallbackUrl || "/api/placeholder/400/300";
};

/**
 * Constructs image URLs for an array of images
 * @param images - Array of image paths
 * @returns Array of full image URLs
 */
export const constructImageUrls = (images: string[]): string[] => {
  return images.map(constructImageUrl);
};
