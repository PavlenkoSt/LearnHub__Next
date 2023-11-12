"use client";

import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (loading) return;

    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage("");

      if (password !== repeatedPassword) {
        throw new Error("Passwords not match");
      }

      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message);
      }

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
        required
        autoComplete="new-password"
      />
      <Input
        type="password"
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        name="repeatedPassword"
        minLength={6}
        placeholder="Write a password one more time..."
        label="Repeat password"
        autoComplete="repeat-password"
        required
      />
      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
      <div className="flex items-center justify-between">
        <Btn type="submit" loading={loading}>
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
