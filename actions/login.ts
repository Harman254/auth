"use server";

import { LoginSchema } from "@/schemas";

import * as z from "zod";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const ValidatedFields = LoginSchema.safeParse(values);
  console.log(ValidatedFields);
  if (ValidatedFields.success === false) {
    return { error: "Invalid Fields" };
  }

  //TODO: login the user

  return { success: "Email sent successfully" };
};
