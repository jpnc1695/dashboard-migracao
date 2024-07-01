"use server";
import { Prisma } from "@prisma/client";
import prisma from "../lib/db";

export async function CreateUser(emailDoUsuario:string, senha:string) {
    try {
        await prisma.user.create({
            data:{
                email: emailDoUsuario,
                senha: senha
            }
        })
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2002') {
              console.log(
                'There is a unique constraint violation, a new user cannot be created with this email'
              )
            }
          }
          throw error
    }
 
}