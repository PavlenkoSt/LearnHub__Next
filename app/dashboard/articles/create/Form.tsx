"use client";

import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import TextArea from "@/app/_components/UI/TextArea";
import { twMerge } from "tailwind-merge";
import { revalidatePath } from "next/cache";
import ImagePicker, {
  useImagePickerState,
} from "@/app/_components/UI/ImagePicker";
import Avatar from "@/app/_components/UI/Avatar";
import { useImagePreview } from "@/app/_hooks/useImagePreview";
import { createArticleAction } from "@/app/_server-actions/articles";

const DESCRIPTION_MAX_LEN = 250;

interface IForm {
  name: string;
  description: string;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Must contain at least 5 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Must contain at least 10 characters"),
});

export default function Form() {
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const imagePickerState = useImagePickerState();
  const imgPreview = useImagePreview(picture);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IForm> = async ({ name, description }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (picture) formData.append("picture", picture);

      const article = await createArticleAction(formData);

      router.push("/dashboard/articles/" + article.id);
    } catch (e: any) {
      console.log("e", e);
      toast.error(e.message || "Something went wrong");
      setLoading(false);
    }
  };

  const onPickImage = () => {
    setPicture(imagePickerState.uploadedImg);
    imagePickerState.setVisible(false);
  };

  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description");
    setDescriptionLength(description?.toString().length || 0);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start">
        <ImagePicker onSave={onPickImage} state={imagePickerState}>
          <Avatar src={imgPreview || "/placeholder.jpg"} size={200} />
        </ImagePicker>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={onChange}
          className="flex w-full flex-col gap-2 md:gap-4"
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                label="Name"
                color="primary"
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error?.message}
                autoFocus={false}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex w-full flex-col">
                <TextArea
                  value={field.value}
                  onChange={field.onChange}
                  label="Description"
                  name="description"
                  maxLength={DESCRIPTION_MAX_LEN}
                  autoFocus={false}
                  isInvalid={!!fieldState.error?.message}
                  color="primary"
                />
                <div className="flex items-center justify-between">
                  <div className="p-[4px] text-tiny text-danger">
                    {fieldState.error?.message}
                  </div>
                  <div
                    className={twMerge(
                      "text-sm text-gray-500",
                      !!fieldState.error?.message && "text-danger",
                    )}
                  >
                    {descriptionLength}/{DESCRIPTION_MAX_LEN}
                  </div>
                </div>
              </div>
            )}
          />
          <Btn
            type="submit"
            className="flex w-full items-center justify-center text-center"
            isLoading={loading}
          >
            Create
          </Btn>
        </form>
      </div>
    </>
  );
}
