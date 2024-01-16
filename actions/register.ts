"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import * as z from "zod";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const ValidatedFields = RegisterSchema.safeParse(values);
  if (ValidatedFields.success === false) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = ValidatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

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
  return { success: `Welcome ${name}! account created succesfully` };
};
