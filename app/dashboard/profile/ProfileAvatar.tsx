"use client";

import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImagePicker, {
  useImagePickerState,
} from "@/app/_components/UI/ImagePicker";

interface IProps {
  children: ReactNode;
}

export default function ProfileAvatar({ children }: IProps) {
  const session = useSession();
  const router = useRouter();

  const state = useImagePickerState();

  const onSave = async () => {
    if (!session.data) {
      return toast.error("No session is found");
    }

    if (!state.uploadedImg) {
      return toast.error("Please select image");
    }

    try {
      state.setUploading(true);

      const formData = new FormData();
      formData.append("image", state.uploadedImg);

      const response = await fetch(`/api/user/${session.data.user.id}/avatar`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (response.status >= 400 || !data) {
        throw new Error(data.message || "Something went wrong");
      }

      state.setVisible(false);
      state.setUploadedImg(null);

      await session.update({
        ...session,
        user: data.user,
      });

      router.refresh();
      toast.success("Avatar has been changed successfully");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      state.setUploading(false);
    }
  };

  return (
    <ImagePicker state={state} onSave={onSave} roundedPreview>
      {children}
    </ImagePicker>
  );
}
