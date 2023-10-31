import { getCurrentUserData } from "@/lib/firestore";

import UserProfileForm from "@/components/userProfileForm/UserProfileForm";

const page = async () => {
    const userData = await getCurrentUserData();
    return (
        <div className='relative'>
            <div className='flex pt-32 leading-6 tracking-wider'>
                <div className=' w-full p-4 bg-[rgb(237,241,243)] mr-2 rounded-md '>
                    <UserProfileForm userData={userData} />
                </div>
            </div>
        </div>
    );
};

export default page;
