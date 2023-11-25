//middleware.js
import createMiddleware from "next-intl/middleware";

import { supabseMiddleware } from "./utils/supabase/middleware";

const intlMiddleware = createMiddleware({
    locales: ["en", "ar"],

    defaultLocale: "ar",
});

export async function middleware(request) {
    const res = await intlMiddleware(request);
    const response = await supabseMiddleware(request, res);
    return response;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
