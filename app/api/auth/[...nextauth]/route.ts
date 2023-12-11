import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }),
        CredentialsProvider({ // This handles the username/password login
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) { // This is the authorization function which compares what the user entered as password with the hashed password in the database and returns the user if they match
                if (!credentials?.email || !credentials?.password) { // If the user didn't enter an email or password, throw an error
                    throw new Error("Please enter your email and password");
                }

                const user = await prisma.user.findUnique({ // Find the user in the database
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) { // If the user doesn't exist or doesn't have a hashed password(they signed up with a social provider), throw an error
                    throw new Error("Incorrect email or password");
                }

                // We need to await this because bcrypt.compare is asynchronous and we need to wait for it to finish before we can continue, otherwise the function will return before the comparison is done
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword); // Compare the user's entered password with the hashed password in the database

                if (!isCorrectPassword) { // If the passwords don't match, throw an error
                    throw new Error("Incorrect email or password");
                }

                return user; // If the passwords match, return the user
            }
        })

    ],

    debug: process.env.NODE_ENV === "development", // If we're in development, show debug messages in the console and in the browser console. If we're in production, don't show debug messages
    session: {
        strategy: "jwt", // We're using JWTs for sessions
    },
    secret: process.env.NEXTAUTH_SECRET as string, // This is the secret used to sign the JWTs
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}; // We need to export the handler twice because NextAuth uses the same handler for GET and POST requests