/**
 * The above code exports a middleware function that combines Supabase middleware and
 * internationalization middleware for a Next.js application.
 * @param request - The `request` parameter is the incoming HTTP request object. It contains
 * information about the request, such as the request method, headers, URL, and body. It is used to
 * process and handle the request in the middleware function.
 * @returns The middleware function is returning the response from the `intlMiddleware` function.
 */
//middleware.js
import createMiddleware from "next-intl/middleware";

import { supabseMiddleware } from "./utils/supabase/middleware";

const intlMiddleware = createMiddleware({
    locales: ["en", "ar"],

    defaultLocale: "ar",
});

export async function middleware(request) {
    const res = await supabseMiddleware(request);
    const response = await intlMiddleware(request, res);
    return response;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
