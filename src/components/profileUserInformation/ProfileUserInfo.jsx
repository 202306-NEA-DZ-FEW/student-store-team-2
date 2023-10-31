import React from "react";
import { PiMapPinLineDuotone } from "react-icons/Pi";
import { FaUniversity } from "react-icons/fa";

function ProfileUserInfo({ user }) {
    return (
        <div clssName='flex flex-col p-2 ml-4 border border-red-300 border-l-1 '>
            <h2 className='font-semibold text-base text-[#55585B]'>
                {user ? user.first_name : null} {user ? user.last_name : null}
            </h2>
            <div className='text-[#55585B] flex gap-1'>
                <FaUniversity />
                <p className='font-medium text-xs  pt-1'>
                    {user ? user.institution : null}
                </p>
            </div>

            <div className='text-[#72ADC7] flex gap-1'>
                <PiMapPinLineDuotone />
                <p className='font-normal text-xs '>
                    {user ? user.address.city : null},{" "}
                    {user ? user.address.state : null}
                </p>
            </div>
        </div>
    );
}

export default ProfileUserInfo;
