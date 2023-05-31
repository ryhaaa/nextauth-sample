import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          return {
            accessToken: "accessToken",
            accessTokenExpires: "accessTokenExpires",
            refreshToken: "refreshToken",
          };
        } catch (e) {
          throw new Error(e.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      const cookie_val = {
        custom_value: "sample",
      };

      if (trigger == "signIn") {
        //Affects another cookie?
        cookies().set({
          name: `custom_cookie`,
          value: "custom_cookie_values",
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 3600,
        });

        return {
          ...token,
          ...cookie_val,
        };
      }

      return {
        ...token,
        ...cookie_val,
      };
    },
    async session({ session, token }) {
      //console.log('Session Callback', { session, token });
      return session;
    },
  },
  events: {
    signOut: async (session, token) => {
      cookies().set({
        name: `custom_cookie`,
        path: "/",
        maxAge: -1,
      });
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
