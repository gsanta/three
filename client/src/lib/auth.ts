import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import db from './db';
import bcrypt from 'bcrypt';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize({ email, password }) {
        const user = await db.user.findFirst({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
        };
      },
    }),
    GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'credentials') {
        return true;
      }

      if (!profile?.email) {
        throw new Error('No profile');
      }
      await db.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
        },
        update: {},
      });
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/editor',
  },
};
