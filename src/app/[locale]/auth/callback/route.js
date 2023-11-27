/**
 * This JavaScript function handles a GET request by exchanging an authorization code for a session
 * token using Supabase authentication and redirecting the user to the appropriate page based on the
 * result.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request. It includes properties such as `url`, `method`, `headers`, and `body`. In this code
 * snippet, the `request` object is used to extract the `code` parameter from the query string of the
 * @returns The code is returning a Next.js `NextResponse` object. If the `code` parameter is present
 * in the URL, it attempts to exchange the code for a session using Supabase's
 * `auth.exchangeCodeForSession` method. If there is no error, it redirects the user back to the origin
 * URL. If there is an error, it redirects the user to an error page with instructions
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const nextUrl = new URL(request.url);
    const { searchParams } = nextUrl;
    const code = searchParams.get("code");

    if (code) {
        const cookieStore = cookies();
        const supabase = createServerClient(
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
                        cookieStore.delete({ name, ...options });
                    },
                },
            }
        );
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(nextUrl.origin);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${nextUrl.origin}/auth/auth-code-error`);
}
