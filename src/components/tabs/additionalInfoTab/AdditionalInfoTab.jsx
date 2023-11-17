"use client";
function AdditionalInfoTab({ items }) {
    return (
        <>
            <div className='w-full flex flex-col justify-center gap-y-6 '>
                <div className='bg-[#EDF1F3] p-1 m-2 rounded flex items-center text-sm font-base text-gray-700 '>
                    <div className='w-full border-2 border-gray-200 rounded-lg p-4'>
                        <h1 className='text-3xl text-[#72adc7]'>
                            {items ? items[0].content.title : null}
                        </h1>
                        <p className='text-[#3A3A3A] mt-8'>
                            {items ? items[0].content.text : null}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AdditionalInfoTab;
