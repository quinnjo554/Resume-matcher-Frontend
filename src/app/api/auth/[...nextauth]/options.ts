import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Email",

        },
        password: {
          label: "Password:",
          type: "password",
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const response = await fetch(`http://localhost:8088/User/${credentials?.email}`);
        const user = await response.json();
        //todo hash password
        if (response.ok && credentials.password == user.hashedPassword) {
          return user;
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}
