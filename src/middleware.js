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
    localeDetection: true,
    defaultLocale: "en",
});

/**
 * The `supabseMiddleware` function is a middleware function that handles authentication and cookie
 * management for Supabase in a Next.js server-side rendering (SSR) environment.
 * @param request - The `request` parameter represents the incoming HTTP request object. It contains
 * information about the request, such as headers, cookies, and query parameters.
 * @param response - The `response` parameter is the HTTP response object that will be sent back to the
 * client. It is used to set cookies and modify the response headers.
 * @returns The `supabseMiddleware` function returns the `response` object.
 */

export async function middleware(request) {
    const res = await intlMiddleware(request);
    const response = await supabseMiddleware(request, res);
    return response;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
