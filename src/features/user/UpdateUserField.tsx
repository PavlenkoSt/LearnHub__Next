"use client";

import React, { useRef, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@nextui-org/react";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "@/src/shared/UI/Input";
import { UserFieldEnum } from "@/src/entities/types/UserFieldEnum";
import { updateUserInfoAction } from "@/src/entities/actions/user";

interface IProps {
  label: string;
  setFieldLabel: string;
  fieldValue: string;
  fieldName: "firstName" | "lastName" | "email";
  formName: UserFieldEnum;
  isLast?: boolean;
  isEmail?: boolean;
}

interface IForm {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function UpdateUserField({
  label,
  setFieldLabel,
  fieldValue,
  fieldName,
  formName,
  isLast,
  isEmail,
}: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  const [loading, startTransition] = useTransition();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      [fieldName]: fieldValue,
    },
    resolver: yupResolver(
      yup.object({
        [fieldName]: isEmail
          ? yup.string().required("Required").email("Please enter valid email")
          : yup
              .string()
              .required("Required")
              .min(4, "Must contain at least 4 characters"),
      }),
    ),
  });

  const submitBtnRef = useRef<HTMLInputElement>(null);

  const isFormActive = searchParams.get("activeForm") === formName;

  const onActivateForm = () => {
    const params = new URLSearchParams();
    params.set("activeForm", formName);
    router.replace(pathname + "?" + params.toString());
  };

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (loading) return;

    startTransition(async () => {
      try {
        if (!session.data?.user) {
          throw new Error("No user is found");
        }

        const field = data[fieldName];

        if (!field) {
          throw new Error("No value is found");
        }

        const user = await updateUserInfoAction({
          id: session.data.user.id,
          updateDto: {
            [fieldName]: field,
          },
        });

        await session.update({
          ...session,
          user,
        });
        router.replace(pathname);
        router.refresh();
      } catch (e: any) {
        toast.error(e.message || "Something went wrong");
      }
    });
  };

  return (
    <form
      className={twMerge(
        "flex flex-col items-center gap-1 border-b-[1px] border-primary bg-white px-2 md:h-[80px] md:flex-row md:px-6",
        isLast && "border-0",
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-md flex-1 text-center font-medium md:text-start">
        {label}
      </div>
      {isFormActive ? (
        <div className="md:md-0 flex h-full items-center gap-3">
          <Controller
            name={fieldName}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                color="primary"
                autoFocus
                size="sm"
                errorMessage={fieldState.error?.message}
                classNames={{
                  inputWrapper: "py-0 h-[30px]",
                  innerWrapper: "h-[30px]",
                  base: "h-full",
                  mainWrapper: "flex justify-center flex-col",
                }}
              />
            )}
          />
          <input ref={submitBtnRef} type="submit" hidden />
          <div
            onClick={() => submitBtnRef.current?.click()}
            className={twMerge(
              "flex h-[40px] w-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-md border-4 border-primary text-primary transition-all md:hover:border-green-600 md:hover:text-green-600",
              loading &&
                "cursor-default border-transparent hover:border-transparent md:hover:border-transparent",
            )}
          >
            {loading ? <Spinner color="primary" /> : <FaCheck size={15} />}
          </div>
        </div>
      ) : (
        <div
          onClick={onActivateForm}
          className={twMerge(
            "group flex flex-1 cursor-pointer items-center justify-between gap-2 hover:underline",
            !fieldValue && "text-blue-600",
          )}
        >
          {fieldValue || setFieldLabel}
          <div className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-md border-4 border-selected-dark p-2 text-selected-dark opacity-100 transition-all group-hover:opacity-100 md:mb-0 md:opacity-0">
            <MdEdit size={15} />
          </div>
        </div>
      )}
    </form>
  );
}
