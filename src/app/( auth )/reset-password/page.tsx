"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    try {
      if (values.password !== values.confirmPassword)
        return console.error("Password does not match");
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token: token ?? "",
      });
      if (!error)
        console.log("Password reset successfully"), router.push("/signin");
      else console.error(error.message);
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 justify-center items-center min-h-screen w-[30%] mx-auto"
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-2 border-2 border-red-100"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="mb-2 border-2 border-red-100"
        />
        <button type="submit" className="mb-2 cursor-pointer">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
