/**
 * The `supabseMiddleware` function creates a Supabase client for server-side rendering and handles
 * cookie management.
 * @returns The function `supabseMiddleware` returns an instance of the Supabase client that is created
 * using the `createServerClient` function.
 */
"use server";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function supabseMiddleware({ request, response }) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return request.cookies.get(name)?.value;
                },
                set(name, value, options) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name, options) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    return supabase;
}
