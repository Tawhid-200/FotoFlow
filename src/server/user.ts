"use server";

import { auth } from "@/lib/auth";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "Signed in Successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Fail to sign in" };
  }
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });
    return { success: true, message: "Signed up Successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Fail to sign up" };
  }
};
