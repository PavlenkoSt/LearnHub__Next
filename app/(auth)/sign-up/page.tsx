"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import { createUserAction } from "@/app/_server-actions/user";

interface IForm {
  email: string;
  password: string;
  repeatedPassword: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 symbols"),
  repeatedPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 symbols"),
});

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatedPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IForm> = async ({
    email,
    password,
    repeatedPassword,
  }) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");

      if (password !== repeatedPassword) {
        throw new Error("Passwords not match");
      }

      await createUserAction({
        email,
        password,
      });

      const signInResult = await signIn("login", {
        email,
        password,
        redirect: false,
        callbackUrl: "",
      });

      if (!signInResult?.ok)
        throw new Error(signInResult?.error || "Something went wrong");

      router.replace(searchParams.get("callbackUrl") || "/dashboard");
    } catch (e: any) {
      console.log("e", e);
      setLoading(false);
      setErrorMessage(e?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            value={field.value}
            onChange={field.onChange}
            label="Email"
            autoComplete="email"
            color="primary"
            placeholder=" "
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            value={field.value}
            onChange={field.onChange}
            type="password"
            label="Password"
            autoComplete="new-password"
            color="primary"
            placeholder=" "
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="repeatedPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            value={field.value}
            onChange={field.onChange}
            type="password"
            label="Repeat password"
            autoComplete="repeat-password"
            color="primary"
            placeholder=" "
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
          />
        )}
      />
      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      <div className="flex items-center justify-between">
        <Btn type="submit" isLoading={loading}>
          Sign Up
        </Btn>
        <Link
          href="/sign-in"
          className="text-sm font-medium text-active transition-all hover:text-sky-700"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
