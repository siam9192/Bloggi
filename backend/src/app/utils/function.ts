export function generateSlug(name:string) {
    return name
      .toLowerCase()                 // Convert to lowercase
      .replace(/[^a-z0-9\s]/g, '')   // Remove special characters
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .trim();                       // Remove leading/trailing spaces
  }
  