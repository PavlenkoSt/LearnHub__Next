"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        try {
          setLoading(true);
          e.preventDefault();
          const result = await signIn("login", {
            email,
            password,
            redirect: false,
            callbackUrl: "",
          });

          console.log("result", result);
        } finally {
          setLoading(false);
        }
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        minLength={6}
      />
      <input type="submit" value="Sign In" />
    </form>
  );
}
