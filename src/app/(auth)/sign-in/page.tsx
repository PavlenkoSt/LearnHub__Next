"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import Btn from "@/src/shared/UI/Btn";
import Input from "@/src/shared/UI/Input";
import NextLink from "@/src/shared/UI/NextLink";
import GoogleSignIn from "@/src/features/auth/GoogleSignIn";

interface IForm {
  email: string;
  password: string;
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
});

export default function SignIn() {
  const [loading, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IForm> = ({ email, password }) => {
    if (loading) return;

    startTransition(async () => {
      try {
        setErrorMessage("");
        const result = await signIn("login", {
          email,
          password,
          redirect: false,
          callbackUrl: "",
        });

        if (!result?.ok) throw new Error("Invalid credentials");

        router.replace(searchParams.get("callbackUrl") || "/dashboard");
      } catch (e: any) {
        setErrorMessage(e?.message || "Something went wrong");
      }
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session.status, router]);

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
            placeholder=" "
            color="primary"
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
            autoComplete="password"
            placeholder=" "
            color="primary"
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
          />
        )}
      />
      {!!errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      <div className="flex items-center justify-between">
        <Btn type="submit" isLoading={loading}>
          Sign In
        </Btn>
        <NextLink
          href="/sign-up"
          className="text-sm font-medium text-active transition-all hover:text-sky-700"
        >
          You do not have an account?
        </NextLink>
      </div>
      <GoogleSignIn />
    </form>
  );
}
