"use client";
import { createBrowserClient } from "@supabase/ssr";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ styling }) => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const loginWithGoogle = async () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <button onClick={loginWithGoogle} className={`${styling}`}>
            <FcGoogle className=' w-6 h-6' />
            {/* <span className='hidden sm:block'>{t(`${googleText}`)}</span> */}
        </button>
    );
};

export default GoogleLoginButton;
