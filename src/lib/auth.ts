import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import nodemailer from "nodemailer";
import { schema } from "@/db/schema";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"Test" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "Verify your email address",
        html: `
          <div>
            <h2>Hello ${user.name || "User"},</h2>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${url}" target="_blank">${url}</a>
          </div>
        `,
      });
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 3600 * 2,
    trustedOrigins: ["http://localhost:3000"],
    sendResetPassword: async ({ user, url }) => {
      console.log({ user: user, url: url });
      await transporter.sendMail({
        from: `"Test" <${process.env.SMTP_USER}>`,
        to: [user.email],
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [nextCookies()],
});
