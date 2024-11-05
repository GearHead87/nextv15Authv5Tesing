import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { saltAndHashPassword } from './utils/helper';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				if (!credentials || !credentials.email || !credentials.password) {
					return null;
				}
				const email = credentials.email as string;
				const hash = saltAndHashPassword(credentials.password);

				let user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				if (!user) {
					user = await prisma.user.create({
						data: {
							email,
							hashedPassword: hash,
						},
					});
				} else {
					const isMatch = bcrypt.compareSync(
						credentials.password as string,
						user.hashedPassword as string
					);
					if (!isMatch) {
						throw new Error('Incorrect password.');
					}
				}
				return user;
			},
		}),
	],
});
