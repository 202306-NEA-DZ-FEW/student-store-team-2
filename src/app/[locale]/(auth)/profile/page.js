import { UploadImage } from "@/components/UploadImage/uploadImage";

const page = () => {
    return (
        <div className='pb-40'>
            <div className='flex  leading-6 tracking-wider mb-20'>
                <div className='font-lato font-semibold text-xl w-96 h-72 ml-24 mt-36 bg-bkg text-titleContent p-4'>
                    <div className='flex justify-center items-center mb-4  hover:bg-accent hover:text-bkg h-20'>
                        PROFILE
                    </div>
                </div>
                <div className='flex-1 p-4 bg-gray-400 mr-2 rounded-md mt-20'>
                    <h1 className='font-jost tracking-wider text-title text-4xl text-center pr-96 mr-80 pt-12'>
                        Profile
                    </h1>
                    <h1 className='font-jost tracking-wider text-title text-xl text-center pr-96 mr-72'>
                        General Details
                    </h1>
                    <UploadImage />
                </div>
                <div className='px-25'></div>
            </div>
        </div>
    );
};

export default page;
