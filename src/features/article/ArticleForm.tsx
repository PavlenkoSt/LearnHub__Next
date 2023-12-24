"use client";

import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { twMerge } from "tailwind-merge";
import type { Article, ArticleCategory } from "@prisma/client";
import ImagePicker, { useImagePickerState } from "@/src/shared/UI/ImagePicker";
import Avatar from "@/src/shared/UI/Avatar";
import { useImagePreview } from "@/src/shared/hooks/useImagePreview";
import { getImageSrc } from "@/src/shared/utilts/getImageSrc";
import Btn from "@/src/shared/UI/Btn";
import Input from "@/src/shared/UI/Input";
import TextArea from "@/src/shared/UI/TextArea";
import AutocompleteComponent from "@/src/shared/UI/Autocomplete";
import {
  createArticleAction,
  updateArticleAction,
} from "@/src/entities/actions/articles";
import { createCategoryAction } from "@/src/entities/actions/categories";
import ArticleBodyEditor from "@/src/features/article/ArticleBodyEditor";

const DESCRIPTION_MAX_LEN = 250;

interface IForm {
  name: string;
  description: string;
  category?: string;
}

interface IProps {
  article?: Article & { category: ArticleCategory | null };
  categories: ArticleCategory[];
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
  category: yup.string().optional(),
});

export default function ArticleForm({ article, categories }: IProps) {
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
      category: article?.category?.name || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IForm> = async ({
    name,
    description,
    category,
  }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("body", body);

      if (picture) formData.append("picture", picture);

      if (category) {
        const existCategory = categories.find(
          (cat) => cat.name.toLowerCase() === category.toLowerCase(),
        );

        if (existCategory) {
          formData.append("categoryId", existCategory.id.toString());
        } else {
          const createdCategory = await createCategoryAction(category);
          formData.append("categoryId", createdCategory.id.toString());
        }
      }

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
            name="category"
            control={control}
            render={({ field }) => (
              <AutocompleteComponent
                inputValue={field.value}
                onSelectionChange={(key) => {
                  field.onChange(key as string);
                }}
                onInputChange={field.onChange}
                items={categories.map((category) => ({
                  label: category.name,
                  value: category.name,
                }))}
                defaultFilter={(text, input) =>
                  text.toLowerCase().includes(input?.toLowerCase())
                }
                label="Category"
                className="w-full"
                color="primary"
                maxLength={25}
                placeholder=" "
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
