"use client";

import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("login", {
        email,
        password,
        redirect: false,
        callbackUrl: "",
      });

      if (!result?.ok) throw new Error(result?.error || "Something went wrong");

      router.replace("/dashboard");
    } catch (e) {
      setLoading(false);
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
      />
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
