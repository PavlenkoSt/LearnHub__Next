export const getImageSrc = (image: string | null | undefined) => {
  if (image?.includes("https://") || image?.includes("https://")) return image;
  return image ? "/tmp/" + image : null;
};
