"use client";

import React, { FormEvent, useState } from "react";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import TextArea from "@/app/_components/UI/TextArea";

const DESCRIPTION_MAX_LEN = 250;

export default function Form() {
  const [descriptionLength, setDescriptionLength] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("====================================");
    console.log("cak");
    console.log("====================================");
  };

  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const description = formData.get("description");
    setDescriptionLength(description?.toString().length || 0);
  };

  return (
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4"
    >
      <Input label="Name" name="name" minLength={5} required />
      <div className="flex w-full flex-col items-end">
        <TextArea
          label="Description"
          name="description"
          maxLength={DESCRIPTION_MAX_LEN}
          minLength={10}
          required
        />
        <div className="text-sm text-gray-500">
          {descriptionLength}/{DESCRIPTION_MAX_LEN}
        </div>
      </div>
      <Btn type="submit">Create</Btn>
    </form>
  );
}
