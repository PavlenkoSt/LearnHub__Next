"use client";

import React, { FormEvent, useState } from "react";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import TextArea from "@/app/_components/UI/TextArea";
import ImagePicker, {
  useImagePickerState,
} from "@/app/_components/UI/ImagePicker";
import Avatar from "@/app/_components/UI/Avatar";
import { useImagePreview } from "@/app/_hooks/useImagePreview";

const DESCRIPTION_MAX_LEN = 250;

export default function Form() {
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);

  const imagePickerState = useImagePickerState();
  const imgPreview = useImagePreview(picture);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("====================================");
    console.log("cak");
    console.log("====================================");
  };

  const onPickImage = () => {
    setPicture(imagePickerState.uploadedImg);
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
          onSubmit={onSubmit}
          onChange={onChange}
          className="flex w-full flex-col"
        >
          <Input
            label="Name"
            name="name"
            minLength={5}
            required
            autoFocus={false}
          />
          <div className="flex w-full flex-col items-end">
            <TextArea
              label="Description"
              name="description"
              maxLength={DESCRIPTION_MAX_LEN}
              minLength={10}
              required
              autoFocus={false}
            />
            <div className="text-sm text-gray-500">
              {descriptionLength}/{DESCRIPTION_MAX_LEN}
            </div>
          </div>
          <Btn
            type="submit"
            className="flex w-full items-center justify-center text-center"
          >
            Create
          </Btn>
        </form>
      </div>
    </>
  );
}
