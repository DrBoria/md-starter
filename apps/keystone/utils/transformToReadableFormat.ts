/**
 * Transforms a URL path into a human-readable format, including camelCase and PascalCase segments.
 *
 * @param path - The URL path to transform.
 * @returns A human-readable string derived from the path.
 */
function transformToReadableFormat(path: string): string {
  // Remove any leading slashes
  const trimmedPath = path.replace(/^\//, "");

  // Split the path into segments by '/'
  const segments = trimmedPath.split("/");

  // Check if the path is valid
  if (segments.length === 0) {
    return "";
  }

  // Map each segment to a readable format
  const readableSegments = segments.map((segment, index) => {
    // Remove any dynamic parts like [id]
    const cleanSegment = segment.replace(/\[.*?\]/, "");

    // Handle camelCase and PascalCase by adding spaces before uppercase letters
    const spacedSegment = cleanSegment
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Space between lowercase and uppercase
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Handle consecutive uppercase

    // Capitalize each word and replace hyphens with spaces
    const words = spacedSegment.split(/[-\s]/).map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join words back with a space
    const readableSegment = words.join(" ");

    // If it's the last segment and it's a known action like 'create', skip it
    if (
      index === segments.length - 1 &&
      ["create", "edit", "view"].includes(readableSegment.toLowerCase())
    ) {
      return "";
    }

    return readableSegment;
  });

  // Filter out any empty segments and join with spaces
  return readableSegments.filter((segment) => segment !== "").join(" ");
}

export { transformToReadableFormat };
