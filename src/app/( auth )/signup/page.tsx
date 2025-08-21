"use client";

import { authClient } from "@/lib/auth-client";
import { signUpUser } from "@/server/user";
import { useRouter } from "next/navigation";
import React from "react";

const Signup = () => {
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await signUpUser(
        values.name,
        values.email,
        values.password
      );
      if (response.success)
        console.log(response.message), router.push("/signin");
      else console.error(response.message);
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  }

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        action="#"
        method="post"
        className="flex flex-col gap-2 justify-center items-center min-h-screen w-[30%] mx-auto"
      >
        <input
          type="text"
          name="name"
          className="mb-2 border-2 border-red-100"
        />
        <input
          type="email"
          name="email"
          className="mb-2 border-2 border-red-100"
        />
        <input
          type="password"
          name="password"
          className="mb-2 border-2 border-red-100"
        />
        <button type="submit" className="mb-2 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
