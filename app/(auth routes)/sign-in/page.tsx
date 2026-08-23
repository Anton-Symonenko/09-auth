"use client";

import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";
import { useState } from "react";

import { login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setError("");
    try {
      await login({
        email,
        password,
      });
      router.push("/profile");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} onSubmit={handleSubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}
