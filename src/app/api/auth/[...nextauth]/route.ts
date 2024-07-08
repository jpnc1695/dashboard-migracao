import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? ""
      })
  ]
  })
  
  export {handler as GET, handler as POST}

// import {authOptionsCredential} from "@/app/lib/auth";


// const handler = NextAuth(authOptionsCredential)


// export {handler as GET, handler as POST}



// export const {
//   handlers:{GET, POST},
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers:[GitHubProvider )],
// })

