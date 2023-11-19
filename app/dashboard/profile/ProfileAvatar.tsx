"use client";

import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UploadDropzone } from "@/app/_utilts/uploadthing";
import ModalWrapper from "@/app/_components/UI/ModalWrapper";
import Progress from "@/app/_components/UI/Progress";

const maxFileSize = 4194304;
const allowedFileTypes = ["image/jpeg", "image/png"];

interface IProps {
  children: ReactNode;
}

const controller = new AbortController();

export default function ProfileAvatar({ children }: IProps) {
  const session = useSession();

  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uloadingProgress, setUploadingProgress] = useState(0);

  useEffect(() => {
    if (!visible && uploading) {
      controller.abort("closed modal");
      setUploading(false);
      setUploadingProgress(0);
    }
  }, [visible, uploading]);

  return (
    <div>
      <button onClick={() => setVisible(true)}>{children}</button>
      <ModalWrapper visible={visible} setVisible={setVisible}>
        <div className="relative">
          {uploading && (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-white">
              <Progress progress={uloadingProgress} />
            </div>
          )}
          <UploadDropzone
            endpoint="uploadAvatar"
            content={{
              label: "Choose new avatar or drag and drop",
            }}
            className="mt-0"
            appearance={{
              container: "border-none cursor-pointer",
              button: "hidden",
            }}
            onClientUploadComplete={async (res) => {
              if (!res.length || !session.data?.user.id) return;

              try {
                const image = res[0].url;
                await fetch("/api/user/avatar", {
                  method: "PATCH",
                  body: JSON.stringify({
                    image,
                    id: session.data.user.id,
                  }),
                  signal: controller.signal,
                });
                await session.update({
                  ...session.data,
                  user: {
                    ...session.data.user,
                    image,
                  },
                });
                setUploading(false);
                setVisible(false);
                setUploadingProgress(0);
                toast.success("Avatar has been changed");
              } catch (e) {
                console.error(e);
                toast.error("Something went wrong");
              }
            }}
            onUploadError={(error: Error) => {
              setUploading(false);
              setUploadingProgress(0);
              toast.error(error.message);
            }}
            onUploadProgress={(progress) => {
              setUploadingProgress(progress);
            }}
            onBeforeUploadBegin={(files) => {
              if (files.length > 1) {
                toast.error("You can upload only 1 image");
                return [];
              }

              const targetFile = files[0];

              if (!allowedFileTypes.includes(targetFile.type)) {
                toast.error("The format is not correct, please upload jpg/png");
                return [];
              }

              if (targetFile.size > maxFileSize) {
                toast.error("Images larger than 4MB are not allowed");
                return [];
              }

              setUploading(true);
              return files;
            }}
            config={{ mode: "auto", appendOnPaste: true }}
          />
        </div>
        <Toaster />
      </ModalWrapper>
      <Toaster />
    </div>
  );
}
