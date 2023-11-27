import React from "react";

import {
    createOrGetRoom,
    getRoomMessages,
    getUserProfile,
} from "@/lib/_supabase";
import { getCurrentUser } from "@/lib/_supabaseAuth";

import ChatDisplay from "@/components/chat/chatDisplay/ChatDisplay";

async function Page({ params }) {
    console.log("again");
    const { user } = await getCurrentUser();
    const receiverInfo = await getUserProfile(params.id);
    const roomId = await createOrGetRoom(user.id, params.id);
    const savedMessages = await getRoomMessages(roomId);

    // console.log("reeeeeees", savedMessages);

    return (
        <div className='w-full'>
            <ChatDisplay
                roomId={roomId}
                receiverInfo={receiverInfo}
                userInfo={user}
                savedMessages={savedMessages}
            />
        </div>
    );
}

export default Page;
