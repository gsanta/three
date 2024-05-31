import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import db from './db';
import bcrypt from 'bcrypt';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password' },
      },

      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials?.password || '', user.password || '');

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

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
