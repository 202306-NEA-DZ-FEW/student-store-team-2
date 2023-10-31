import { getCurrentUserData } from "@/lib/firestore";

import UserProfileForm from "@/components/userProfileForm/UserProfileForm";

const page = async () => {
    const userData = await getCurrentUserData();
    return (
        <div className='relative'>
            <div className='flex pt-32 leading-6 tracking-wider'>
                <div className='font-lato font-semibold text-xl w-72 h-72  bg-bkg text-titleContent pt-4'>
                    <div className='flex justify-center items-center mb-4  hover:bg-accent hover:text-bkg h-20'>
                        PROFILE
                    </div>
                </div>
                <div className='flex-1 p-4 bg-[rgb(237,241,243)] mr-2 rounded-md '>
                    <h1 className='font-lato tracking-wider text-title text-4xl text-center pr-96 mr-80 pt-12'>
                        Profile
                    </h1>
                    <h1 className='font-lato tracking-wider text-title text-xl text-center pr-96 mr-72'>
                        Edit your Profile
                    </h1>
                    <UserProfileForm userData={userData} />
                </div>
            </div>
        </div>
    );
};

export default page;
