import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"


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


          if(!credentials?.email || !credentials?.senha) throw new Error("Dados de Login necessarios")

            const user = await prisma.user.findUnique({
                where:{
                    email: credentials?.email
                }
            })

            console.log("USER", user)

            if(!user || !user.senha) {
                throw new Error("Usuários não registrado através de credenciais")
            }
            
            if(user.senha !== credentials.senha){
              throw new Error("Senha Incorreta")
            }
            // const matchPassword = await bcrypt.compare(credentials.senha, user.senha)
            // if(!matchPassword)
            //     throw new Error("Senha incorreta")

            return user
          
        },
        
      })
  ]
  })
  
  export {handler as GET, handler as POST}



