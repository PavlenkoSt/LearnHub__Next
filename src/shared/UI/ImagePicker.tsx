import React, {
  useState,
  useMemo,
  ChangeEventHandler,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { PiUploadSimpleBold } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import ModalWrapper from "./ModalWrapper";
import Btn from "./Btn";
import { useImagePreview } from "@/src/shared/hooks/useImagePreview";

interface IProps {
  children: ReactNode;
  onSave: () => void;
  state: IHookState;
  roundedPreview?: boolean;
}

interface IHookState {
  uploadedImg: File | null;
  setUploadedImg: Dispatch<SetStateAction<File | null>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
}

export const useImagePickerState = () => {
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const state: IHookState = {
    uploadedImg,
    setUploadedImg,
    visible,
    setVisible,
    uploading,
    setUploading,
  };

  return state;
};

export default function ImagePicker({
  children,
  onSave,
  state,
  roundedPreview,
}: IProps) {
  const {
    uploadedImg,
    setUploadedImg,
    visible,
    setVisible,
    uploading,
    setUploading,
  } = state;

  const imgPreview = useImagePreview(uploadedImg);

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

  useEffect(() => {
    if (!visible) {
      setUploadedImg(null);
      setUploading(false);
    }
  }, [visible]);

  const roundedStyle = roundedPreview ? "rounded-full" : "rounded-sm";

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
              <div
                className={twMerge(
                  "h-[200px] w-[200px] border-4 border-[#f6f6f6]",
                  roundedStyle,
                )}
              >
                <Image
                  src={imgPreview}
                  width={200}
                  height={200}
                  className={roundedStyle}
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
                <Btn isLoading={uploading} onClick={onSave}>
                  Save
                </Btn>
                <Btn color="danger" onClick={() => setUploadedImg(null)}>
                  Cancel
                </Btn>
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
