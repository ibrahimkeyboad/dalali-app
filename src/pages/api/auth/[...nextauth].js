import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../db';
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            profile: true,
            accommodations: true,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error('Incorrect email or password');
        }
        let result;
        if (user.profile !== null) {
          result = {
            name: user.name,
            email: {
              userEmail: user.email,
              property: user.profile.category,
              id: user.id,
            },
            image: user.profile.image,
            role: user.role,
          };
        } else {
          result = {
            role: user.role,
            name: user.name,
            email: {
              userEmail: user.email,
              id: user.id,
            },
            image:
              'https://res.cloudinary.com/ibracloud/image/upload/v1669122029/dalali-app/no1jnppbhow0pmipqdbq.jpg',
          };
        }

        await prisma.$disconnect();

        return result;
      },
    }),
  ],

  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    strategy: 'jwt',
  },

  callbacks: {
    jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
      }

      return params.token;
    },
  },

  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
