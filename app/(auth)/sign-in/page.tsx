"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (loading) return;

    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      const result = await signIn("login", {
        email,
        password,
        redirect: false,
        callbackUrl: "",
      });

      if (!result?.ok) throw new Error("Invalid credentials");

      router.replace(searchParams.get("callbackUrl") || "/dashboard");
    } catch (e: any) {
      setLoading(false);
      setErrorMessage(e?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session.status]);

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        placeholder="Write email..."
        label="Email"
        autoComplete="email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        minLength={6}
        placeholder="Write a password..."
        label="Password"
        autoComplete="current-password"
        required
      />
      {!!errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      <div className="flex items-center justify-between">
        <Btn type="submit" loading={loading}>
          Sign In
        </Btn>
        <Link
          href="/sign-up"
          className="text-sm font-medium text-active transition-all hover:text-sky-700"
        >
          You do not have an account?
        </Link>
      </div>
    </form>
  );
}
