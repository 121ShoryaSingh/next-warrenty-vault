import { Db } from '@/lib/Db';
import User from '@/model/User';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthConfig, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest } from 'next/server';

export const authOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await Db();
        if (!credentials?.email || !credentials.password) return null;
        const password = credentials.password as string;
        const user = await User.findOne({ email: credentials.email }).select(
          '+password'
        );
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(password, user.password as string);
        if (!isValid) return null;
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async authorized(params: { request: NextRequest; auth: Session | null }) {
      const { request, auth } = params;
      const { pathname } = request.nextUrl;
      const protectedRoutes = ['/dashboard'];
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );
      if (isProtectedRoute) {
        return !!auth?.user;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
