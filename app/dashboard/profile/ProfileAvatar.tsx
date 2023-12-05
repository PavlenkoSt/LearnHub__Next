"use client";

import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImagePicker, {
  useImagePickerState,
} from "@/app/_components/UI/ImagePicker";
import { updateUserAvatarAction } from "@/app/_server-actions/user";

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
      formData.append("userId", String(session.data.user.id));

      const user = await updateUserAvatarAction(formData);

      state.setVisible(false);
      state.setUploadedImg(null);

      await session.update({ ...session, user });

      router.refresh();
      toast.success("Avatar has been changed successfully");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
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
