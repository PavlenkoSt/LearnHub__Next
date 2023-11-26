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

      const response = await fetch(
        `/api/user/${session.data.user.id}/personal-info`,
        {
          method: "PATCH",
          body: JSON.stringify({
            [fieldName]: fieldValue,
          }),
        },
      );

      const user = await response.json();

      await session.update({
        ...session,
        ...user,
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
        "flex h-[80px] items-center gap-1 border-b-[1px] border-primary bg-white px-6",
        isLast && "border-0",
      )}
      onSubmit={onSubmit}
    >
      <div className="text-md flex-1 font-medium">{label}</div>
      {isFormActive ? (
        <div className="flex items-center gap-1">
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
            className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md border-4 border-primary text-primary transition-all hover:border-green-600 hover:text-green-600"
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
            "group flex flex-1 cursor-pointer items-center justify-between hover:underline",
            !fieldValue && "text-blue-600",
          )}
        >
          {fieldValue || setFieldLabel}
          <div className="text-selected-dark flex h-[40px] w-[40px] items-center justify-center rounded-md border-4 border-selected-dark p-2 opacity-0 transition-all group-hover:opacity-100">
            <MdEdit size={15} />
          </div>
        </div>
      )}
    </form>
  );
}
