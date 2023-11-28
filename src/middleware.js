import createMiddleware from "next-intl/middleware";

import { supabseMiddleware } from "./utils/supabase/middleware";

/**
 * The function is a middleware that handles internationalization and authentication using Supabase.
 * @param request - The `request` parameter is the incoming HTTP request object. It contains
 * information about the request such as the HTTP method, headers, URL, and body.
 * @returns The `res` variable is being returned.
 */
export async function middleware(request) {
    const intlMiddleware = createMiddleware({
        locales: ["en", "ar"],
        localeDetection: true,
        defaultLocale: "en",
    });

    const res = await intlMiddleware(request);
    const supabase = await supabseMiddleware({ request, res });
    await supabase.auth.getSession();

    return res;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
