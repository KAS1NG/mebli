import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SERVER_URL } from "../lib/constants";

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${SERVER_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            throw new Error('Invalid login credentials');
          }

          const user = await res.json();

          if (user?.token) {
            return {
              id: user.userId,
              name: user.username,
              email: user.email,
              role: user.role,
              token: user.token,
            };
          }
          return null;
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.picture = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.role = token.picture as string;
      session.user.userId = token.sub as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions