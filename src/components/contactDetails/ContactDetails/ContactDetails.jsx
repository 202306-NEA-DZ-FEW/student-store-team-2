import { useTranslations } from "next-intl";
import React from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ContactDetails({ user }) {
    const t = useTranslations("Index");
    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber?.startsWith("0")) {
            return "+213" + phoneNumber.slice(1); // Remove the first character '0' and add '+213'
        }
        return phoneNumber; // Return the original number if it doesn't start with '0'
    }
    return (
        <div className='flex  m-4 flex-col sm:p-2 sm:ml-4 ml-2 border-l-1'>
            <h1 className='font-lato text-md font-semibold text-[#55585B]'>
                {t("Contact Details")}
            </h1>
            <div className='flex items-center mt-3 font-jost font-semibold text-base text-[#72ADC7]'>
                <FaPhoneVolume />
                <p className='text-sm font-medium'>
                    {user.phone_num
                        ? formatPhoneNumber(user.phone_num)
                        : "Phone Number Not Available"}
                </p>
            </div>
            <div className='flex items-center mt-3 font-jost font-semibold text-base text-[#72ADC7]'>
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
