"use client";

import React, {
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import { PiUploadSimpleBold } from "react-icons/pi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import ModalWrapper from "@/app/_components/UI/ModalWrapper";
import Btn from "@/app/_components/UI/Btn";
import BtnDanger from "@/app/_components/UI/BtnDanger";

interface IProps {
  children: ReactNode;
}

export default function ProfileAvatar({ children }: IProps) {
  const session = useSession();
  const router = useRouter();

  const [uploadedImg, setUploadedImg] = useState<File | null>(null);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const imgPreview = useMemo(() => {
    if (!uploadedImg) return "";
    return URL.createObjectURL(uploadedImg);
  }, [uploadedImg]);

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return toast.error("Please select image");
    setUploadedImg(file);
  };

  const onDropFile: React.DragEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 1) {
      return toast.error("You can upload only one image");
    }

    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile.type.includes("image")) {
      return toast.error("Invalid file type, please select image");
    }

    setUploadedImg(droppedFile);
  };

  const onOpenModal = () => {
    toast.remove();
    setVisible(true);
  };

  const onSave = async () => {
    if (!session.data) {
      return toast.error("No session is found");
    }

    if (!uploadedImg) {
      return toast.error("Please select image");
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", uploadedImg);

      const response = await fetch(`/api/user/${session.data.user.id}/avatar`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (response.status >= 400 || !data) {
        throw new Error(data.message || "Something went wrong");
      }

      setVisible(false);
      setUploadedImg(null);

      await session.update({
        ...session,
        user: data.user,
      });

      router.refresh();
      toast.success("Avatar has been changed successfully");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      setUploadedImg(null);
      setUploading(false);
    }
  }, [visible]);

  return (
    <div>
      <button onClick={onOpenModal}>{children}</button>
      <ModalWrapper visible={visible} setVisible={setVisible}>
        <div
          className={twMerge(
            "m-2 flex min-h-[200px] items-center justify-center rounded-md border-[1px] border-dashed border-primary bg-secondary",
            uploadedImg && "border-0",
          )}
        >
          {!!uploadedImg ? (
            <div className="flex w-full flex-col items-center gap-4 p-4">
              <div className="text-center text-xl font-bold text-primary">
                Preview:
              </div>
              <div className="h-[200px] w-[200px] rounded-full border-4 border-[#f6f6f6]">
                <Image
                  src={imgPreview}
                  width={200}
                  height={200}
                  className="rounded-full"
                  alt="Uploaded image"
                  style={{
                    objectFit: "cover",
                    minWidth: "100%",
                    minHeight: "100%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="flex w-full flex-1 items-center justify-center gap-12">
                <Btn loading={uploading} onClick={onSave}>
                  Save
                </Btn>
                <BtnDanger onClick={() => setUploadedImg(null)}>
                  Cancel
                </BtnDanger>
              </div>
            </div>
          ) : (
            <form
              onDrop={onDropFile}
              onDragOver={(e) => e.preventDefault()}
              className="h-[200px] w-full"
            >
              <label className="mb-2 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-center text-secondary">
                <PiUploadSimpleBold size={50} />
                <div className="font-medium">
                  <span className="font-bold transition-all hover:text-active">
                    Choose
                  </span>{" "}
                  or drop an image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  multiple={false}
                  hidden
                  required
                />
              </label>
            </form>
          )}
        </div>
        <Toaster />
      </ModalWrapper>
    </div>
  );
}
