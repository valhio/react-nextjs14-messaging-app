import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import bcrypt from 'bcrypt';

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
    secret: "SOME_RANDOM_STRING", // This is the secret used to sign the JWTs
};

function GithubProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}


function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}


function FacebookProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}


function CredentialsProvider(arg0: { // This handles the username/password login
    name: string; credentials: { email: { label: string; type: string; }; password: { label: string; type: string; }; }; authorize(credentials: any): Promise<{ id: string; name: string | null; email: string | null; emailVerified: Date | null; image: string | null; hashedPassword: string | null; createdAt: Date; updatedAt: Date; conversationIds: string[]; seenMessageIds: string[]; }>;
}): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}
