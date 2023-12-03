import { useMemo } from "react";

export const useImagePreview = (imageFile: File | null) => {
  const imgPreview = useMemo(() => {
    if (!imageFile) return "";
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  return imgPreview;
};
