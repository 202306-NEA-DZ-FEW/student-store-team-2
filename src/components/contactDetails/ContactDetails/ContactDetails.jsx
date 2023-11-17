import React from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function ContactDetails({ user }) {
    return (
        <div className='mt-8'>
            <h1 className='font-lato text-md font-semibold text-[#55585B]'>
                Contact Details
            </h1>
            <div className='ml-4 mt-3 font-jost flex gap-1 text-[#72ADC7]'>
                <FaPhoneVolume />
                <p className='text-sm font-medium'>
                    {" "}
                    {user
                        ? "+213 (0)" + user.phone_num
                        : "Phone Number Not Available"}
                </p>
            </div>
            <div className='ml-4 mt-1 font-jost flex gap-1 text-[#72ADC7]'>
                <MdEmail />
                <p className='text-sm font-medium'>
                    {" "}
                    {user ? user.email : "Email Not Available"}
                </p>
            </div>
        </div>
    );
}
export default ContactDetails;
