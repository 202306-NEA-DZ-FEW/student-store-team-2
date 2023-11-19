"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function signUpWithEmailAndPassword(email, password, userData) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { ...userData },
            redirectTo: "/profile",
        },
    });
    if (error) {
        throw error;
    }
    return JSON.stringify(data);
}

export async function readUserSession() {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}

export async function getCurrentUser() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        throw error;
    }
    return data;
}

export async function signOut() {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut({
        options: {
            redirectTo: `/`,
        },
    });
}

export async function signInWithEmailAndPassword(email, password) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
            redirectTo: "/profile",
        },
    });
    if (error) {
        throw error;
    }
    return JSON.stringify(data);
}

export const updateUserMetadata = async (userId, metadata) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("auth.users")
        .update({ raw_user_meta_data: metadata })
        .eq("id", userId);

    if (error) {
        throw error;
    }

    return data;
};
