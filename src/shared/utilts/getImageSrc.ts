export const getImageSrc = (image: string | null | undefined) => {
  return image ? "/tmp/" + image : null;
};
