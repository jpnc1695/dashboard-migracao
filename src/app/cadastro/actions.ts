"use server";
import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../lib/db";

export async function CreateUser(
  emailDoUsuario: string,
  senha: string
): Promise<Prisma.PrismaClientKnownRequestError | any> {
  try {
    await prisma.user.create({
      data: {
        email: emailDoUsuario,
        senha: senha,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // toast.error("E-mail já cadastrado para um usuário.")
        console.log(error.code);
        return error.code;
      }
    }
  }
}
