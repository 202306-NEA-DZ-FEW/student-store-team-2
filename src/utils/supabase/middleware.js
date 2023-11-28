/**
 * The `supabseMiddleware` function is a middleware function that handles authentication and cookie
 * management for Supabase in a Next.js server-side rendering (SSR) environment.
 * @param request - The `request` parameter represents the incoming HTTP request object. It contains
 * information about the request, such as headers, cookies, and query parameters.
 * @param response - The `response` parameter is the HTTP response object that will be sent back to the
 * client. It is used to set cookies and modify the response headers.
 * @returns The `supabseMiddleware` function returns the `response` object.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function supabseMiddleware(request, response) {
    // let response = NextResponse.next({
    //     request: {///////////////////
    //         headers: request.headers,
    //     },
    // });

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

    await supabase.auth.getSession();

    return response;
}
