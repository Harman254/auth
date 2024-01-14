"use server";

import { LoginSchema } from "@/schemas";

import * as z from "zod";

export const Register = async (values: z.infer<typeof LoginSchema>) => {
  const ValidatedFields = LoginSchema.safeParse(values);
  console.log(ValidatedFields);
  if (ValidatedFields.success === false) {
    return { error: "Invalid Fields" };
  }

  return { success: "Email sent successfully" };
};