"use client";

import React, { useTransition } from "react";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Btn from "@/src/shared/UI/Btn";
import InputComponent from "@/src/shared/UI/Input";
import { useCommentReplyToActive } from "@/src/shared/hooks/useCommentReplyToActive";
import { createCommentAction } from "@/src/entities/actions/articleComments";
import CommentReplyMark from "./CommentReplyMark";

interface IProps {
  commentId: number;
  articleId: number;
  isOwner: boolean;
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

export default function CommentReplyForm({
  articleId,
  commentId,
  isOwner,
}: IProps) {
  const [loading, startTransition] = useTransition();

  const isActive = useCommentReplyToActive(commentId);

  const router = useRouter();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const comment = watch("comment");

  const onSubmit = async (form: IForm) => {
    if (loading) return;

    startTransition(async () => {
      try {
        await createCommentAction({
          comment: form.comment,
          articleId,
          repliedToId: commentId,
        });
        onCancel();
        toast.success("Reply added");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const onCancel = () => {
    router.replace(`/dashboard/articles/${articleId}`, { scroll: false });
    reset();
  };

  if (!isActive) return null;

  return (
    <div className="mt-2 flex pl-2 sm:pl-0">
      <div className="hidden sm:flex">
        <CommentReplyMark />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-2"
      >
        <Controller
          name="comment"
          control={control}
          render={({ field, fieldState }) => (
            <InputComponent
              max={250}
              value={field.value}
              onChange={field.onChange}
              color={isOwner ? "default" : "primary"}
              label="Write your reply"
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error?.message}
              autoFocus={true}
            />
          )}
        />
        <div className="flex items-center justify-end gap-2">
          <Btn
            isDisabled={comment.length < 5}
            isLoading={loading}
            type="submit"
          >
            Send
          </Btn>
          <Btn color="danger" onClick={onCancel}>
            Cancel
          </Btn>
        </div>
      </form>
    </div>
  );
}
