/**
 * The above code is a JavaScript module that provides functions for user authentication and session
 * management using Supabase.
 * @returns The code is returning various functions that interact with a Supabase server. These
 * functions include:
 */
"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * The function creates a Supabase server client with cookie handling.
 * @returns The function `createSupabaseServerClient` is returning a promise that resolves to a
 * Supabase server client.
 */
export default async function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,

        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name, options) {
                    cookieStore.set({ name, value: "", ...options });
                },
            },
        }
    );
}

/**
 * The function `signUpWithEmailAndPassword` signs up a user with their email and password, and stores
 * additional user data in a Supabase database.
 * @param email - The `email` parameter is the email address that the user wants to sign up with. It
 * is used as the username for authentication purposes.
 * @param password - The `password` parameter is the password that the user wants to set for their
 * account.
 * @param userData - The `userData` parameter is an object that contains additional data you want to
 * associate with the user during the sign-up process. This data can include any custom fields or
 * information you want to store for the user.
 * @returns a JSON string representation of the `data` object.
 */
export async function signUpWithEmailAndPassword(email, password, userData) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { ...userData },
        },
    });
    if (error) {
        throw error;
    }

    return JSON.stringify(data);
}

/**
 * The function `readUserSession` reads the user session using Supabase server client and returns the
 * session data.
 * @returns the user session data.
 */
export async function readUserSession() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw error;
    }
    return data;
}

/**
 * The function `getCurrentUser` retrieves the current user's data from Supabase if a session exists,
 * otherwise it returns null.
 * @returns the current user data if there is an active session, otherwise it returns null.
 */
export async function getCurrentUser() {
    const supabase = await createSupabaseServerClient();
    const { session } = await readUserSession();

    if (session) {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        return data;
    } else return null;
}

/**
 * The `signOut` function signs out the user from the Supabase server.
 */
export async function signOut() {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
}

/**
 * The function `signInWithEmailAndPassword` signs in a user with their email and password using
 * Supabase authentication and returns the user data as a JSON string.
 * @param email - The email parameter is the email address of the user trying to sign in.
 * @param password - The `password` parameter is the password that the user enters when trying to sign
 * in. It is used to authenticate the user and verify their identity.
 * @returns a JSON string representation of the `data` object.
 */
export async function signInWithEmailAndPassword(email, password) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw error;
    }

    return JSON.stringify(data);
}

/**
 * The function `updateUserMetadata` updates the metadata of a user in a Supabase server.
 * @param metadata - The `metadata` parameter is an object that contains the updated user metadata. It
 * can include any additional information you want to associate with the user, such as their name, age,
 * or any custom fields you have defined.
 * @returns the `data` object if there is no error.
 */
export const updateUserMetadata = async (metadata) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.updateUser({ data: metadata });
    if (error) {
        throw error;
    }
    return data;
};
