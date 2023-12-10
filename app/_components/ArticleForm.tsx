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
import ImagePicker, {
  useImagePickerState,
} from "@/app/_components/UI/ImagePicker";
import Avatar from "@/app/_components/UI/Avatar";
import { useImagePreview } from "@/app/_hooks/useImagePreview";
import {
  createArticleAction,
  updateArticleAction,
} from "@/app/_server-actions/articles";
import ArticleBodyEditor from "./ArticleBodyEditor";
import type { Article } from "@prisma/client";
import { getImageSrc } from "../_utilts/getImageSrc";

const DESCRIPTION_MAX_LEN = 250;

interface IForm {
  name: string;
  description: string;
}

interface IProps {
  article?: Article;
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

export default function ArticleForm({ article }: IProps) {
  const [descriptionLength, setDescriptionLength] = useState(
    () => article?.description.length || 0,
  );
  const [body, setBody] = useState(() => article?.body || "");
  const [picture, setPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const imagePickerState = useImagePickerState();
  const imgPreview = useImagePreview(picture);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: article?.name || "",
      description: article?.description || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IForm> = async ({ name, description }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("body", body);

      if (picture) formData.append("picture", picture);

      const resultArticle = article
        ? await updateArticleAction(formData, article.id)
        : await createArticleAction(formData);

      router.push("/dashboard/articles/" + resultArticle.id);
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
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        <ImagePicker onSave={onPickImage} state={imagePickerState}>
          <Avatar
            src={
              imgPreview ||
              (article?.pictureUrl
                ? getImageSrc(article!.pictureUrl) || "/placeholder.jpg"
                : "/placeholder.jpg")
            }
            size={200}
          />
        </ImagePicker>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={onChange}
          className="md-gap-4 flex w-full flex-col gap-2"
          id="form"
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
              <div className="flex h-full w-full flex-1 flex-col">
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
        </form>
      </div>
      <h3 className="text-primary">Article body:</h3>
      <div className="mb-2 flex w-full">
        <ArticleBodyEditor value={body} setValue={setBody} />
      </div>
      <Btn
        type="submit"
        form="form"
        className="flex w-full items-center justify-center text-center"
        isLoading={loading}
      >
        {article ? "Update" : "Create"}
      </Btn>
    </div>
  );
}