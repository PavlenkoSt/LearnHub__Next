"use client";

import React, { useRef, useState, FormEvent } from "react";
import { twMerge } from "tailwind-merge";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Input from "@/app/_components/UI/Input";
import { ActiveFormEnum } from "./types";
import Loader from "@/app/_components/UI/Loader";
import { updateUserInfoAction } from "@/app/_server-actions/user";

interface IProps {
  label: string;
  setFieldLabel: string;
  fieldValue: string;
  fieldName: string;
  formName: ActiveFormEnum;
  isLast?: boolean;
  isEmail?: boolean;
}

export default function ProfileField({
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

  const submitBtnRef = useRef<HTMLInputElement>(null);

  const isFormActive = searchParams.get("activeForm") === formName;

  const [loading, setLoading] = useState(false);

  const onActivateForm = () => {
    const params = new URLSearchParams();
    params.set("activeForm", formName);
    router.replace(pathname + "?" + params.toString());
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!session.data?.user) {
        throw new Error("No user is found");
      }

      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const fieldValue = formData.get(fieldName);

      if (!fieldValue) {
        throw new Error("No value is found");
      }

      const user = await updateUserInfoAction({
        id: session.data.user.id,
        updateDto: {
          [fieldName]: fieldValue,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={twMerge(
        "flex flex-col items-center gap-1 border-b-[1px] border-primary bg-white px-2 md:h-[80px] md:flex-row md:px-6",
        isLast && "border-0",
      )}
      onSubmit={onSubmit}
    >
      <div className="text-md flex-1 text-center font-medium md:text-start">
        {label}
      </div>
      {isFormActive ? (
        <div className="md:md-0 mb-2 flex items-center gap-1">
          <Input
            name={fieldName}
            defaultValue={fieldValue}
            type={isEmail ? "email" : "text"}
            minLength={4}
            required
            autoFocus
          />
          <input ref={submitBtnRef} type="submit" hidden />
          <div
            onClick={() => submitBtnRef.current?.click()}
            className={twMerge(
              "flex h-[40px] w-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-md border-4 border-primary text-primary transition-all md:hover:border-green-600 md:hover:text-green-600",
              loading && "hover:border-blue-600 md:hover:border-blue-600",
            )}
          >
            {loading ? (
              <Loader className="border-primary" />
            ) : (
              <FaCheck size={15} />
            )}
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
