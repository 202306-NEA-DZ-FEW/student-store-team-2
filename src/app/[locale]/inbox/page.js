import { redirect } from "next/navigation";
import React from "react";

import { readUserSession } from "@/lib/_supabaseAuth";

async function page() {
    const { session } = await readUserSession();

    if (!session) {
        redirect("sign-in");
    }
    return (
        <div className='hidden sm:flex items-center justify-center w-full'>
            <p className='text-3xl px-8 py-4 text-white bg-blue-400 rounded-sm'>
                connect with stundets
            </p>
        </div>
    );
}

export default page;
