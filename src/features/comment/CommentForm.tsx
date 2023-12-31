"use client";

import React, { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Btn from "@/src/shared/UI/Btn";
import TextArea from "@/src/shared/UI/TextArea";
import { createCommentAction } from "@/src/entities/actions/articleComments";

interface IProps {
  articleId: number;
}

interface IForm {
  comment: string;
}

const validationSchema = yup.object({
  comment: yup
    .string()
    .required("Comment required")
    .min(5, "Write at least 5 characters"),
});

export default function CommentForm({ articleId }: IProps) {
  const [loading, startTransition] = useTransition();

  const onSubmit = async (form: IForm) => {
    if (loading) return;

    startTransition(async () => {
      try {
        await createCommentAction({ comment: form.comment, articleId });
        reset();
        toast.success("Comment added");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const comment = watch("comment");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Controller
        name="comment"
        control={control}
        render={({ field, fieldState }) => (
          <TextArea
            max={250}
            value={field.value}
            onChange={field.onChange}
            color="primary"
            label="Write your comment"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
            autoFocus={false}
          />
        )}
      />
      <Btn isDisabled={comment.length < 5} isLoading={loading} type="submit">
        Send
      </Btn>
    </form>
  );
}
