import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()




const handler = NextAuth({
  providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? ""
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { },
          senha: { },
        },  
        async authorize(credentials, req): Promise<any> {
          const user = await prisma.user.findUnique({
              where:{
                email: credentials?.email
              }
          })

          if(!user || !user.senha){
            throw new Error("Usuário não encontrado.")
          }else{
            console.log(user)
          }
        },
        
      })
  ],
  pages:{
    signIn:"/dashBoard"
  }
  })
  
  export {handler as GET, handler as POST}



