export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^\w-]+/g, '') // Remove non-word characters
    .replace(/--+/g, '-') // Replace multiple dashes with a single dash
    .trim(); // Trim leading and trailing dashes
};
