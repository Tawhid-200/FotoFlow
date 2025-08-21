"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";

const Forgotpassword = () => {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get("email") as string,
    };
    try {
      const { error } = await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });
      if (!error) console.log("Check your email to reset your password");
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
          type="email"
          name="email"
          placeholder="Email"
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

export default Forgotpassword;
