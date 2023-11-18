"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { addItem } from "@/lib/supabase";

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
    const result = await supabase.auth.signUp({
        email,
        password,
    });

    await addItem("users", {
        id: result.data.user.id,
        email: result.data.user.email,
        ...userData,
    });

    return JSON.stringify(result);
}

export async function readUserSession() {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}

export async function getCurrentUser() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    return data;
}

export async function signOut() {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/");
}

export async function signInWithEmailAndPassword(email, password) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    console.log("succesfully logged in", data);
    return JSON.stringify(data);
}
