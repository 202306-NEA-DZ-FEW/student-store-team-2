import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { getAuth } from "firebase/auth";
import * as firestoreFunctions from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/lib/firebase";

export const authOptions = {
    // secret: "2EdrfdeyKS5j+i+PPXukNWaGhS3ULF5cHhxn/Hp8P7M=",

    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        }),
    ],
    adapter: FirebaseAdapter({
        db: db,
        ...firestoreFunctions,
    }),
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
