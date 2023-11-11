"use client";

import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Btn from "@/app/_components/UI/Btn";
import Input from "@/app/_components/UI/Input";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordsNotMatch, setIsPasswordsNotMatch] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (password !== repeatedPassword) {
        setIsPasswordsNotMatch(true);
        throw new Error("Passwords not match");
      } else {
        setIsPasswordsNotMatch(false);
      }

      // db logic

      const result = await signIn("login", {
        email,
        password,
        redirect: false,
        callbackUrl: "",
      });

      router.replace("/dashboard");

      console.log("result", result);
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
      <Input
        type="password"
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        name="repeatedPassword"
        minLength={6}
        placeholder="Write a password one more time..."
        label="Repeat password"
        required
      />
      {isPasswordsNotMatch && (
        <div className="text-sm text-red-600">Passwords not match</div>
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
