"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";

import * as z from "zod";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const ValidatedFields = RegisterSchema.safeParse(values);
  console.log(ValidatedFields);
  if (ValidatedFields.success === false) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = ValidatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  //TODO: Send verification email to user
  return { success: `${name} account created succesfully` };
};
