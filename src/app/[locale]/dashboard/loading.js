import React from "react";

function loading() {
    return (
        <div class='flex justify-center items-start mt-48 h-screen'>
            <div class='relative inline-flex'>
                <div class='w-8 h-8 bg-accent rounded-full'></div>
                <div class='w-8 h-8 bg-accent rounded-full absolute top-0 left-0 animate-ping'></div>
                <div class='w-8 h-8 bg-accent rounded-full absolute top-0 left-0 animate-pulse'></div>
            </div>
        </div>
    );
}

export default loading;
