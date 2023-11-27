import { notFound } from "next/navigation";

import { getCoordinates } from "@/lib/_supabase";
import { getProductWithPrice, getUserProfile } from "@/lib/_supabase";

import ProductDisplay from "@/components/product-display/ProductDisplay";
import ProductDetailSection from "@/components/productDetailsSection/ProductDetailSection";
import TabsComponent from "@/components/tabs/TabsComponent";

//     ssr: false,
// });

// const user = {
//     first_name: "Mohammed",
//     last_name: "Bennaceur",
//     birth_date: "29 octobre 2000",
//     gender: "male",
//     email: "bennaceurm@gmail.com",
//     phoneNumber: "777112233",
//     address: {
//         building: "villa N°15",
//         street: "Boulvard des martyres",
//         city: "Ghazaouat",
//         state: "Tlemcen",
//     },
//     institution: "Abou Bekr Belkaid University of Tlemcen",
//     profile_pic:
//         "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// };

// const commentData = {
//     1: {
//         text: "i like that product <3 ",
//         date: "November 14,2023 at 11:55 pm",
//         likes: 2,
//     },
//     2: {
//         text: "what's the price",
//         date: "November 29,2023 at 01:55 am",
//         likes: 0,
//     },
// };
// const replyData = {
//     1: {
//         1: {
//             text: "me too",
//             date: "November 14,2023 at 11:59 pm",
//             likes: 1,
//         },
//         2: { text: "i don't", date: "November 15,2023 at 10:55 am", likes: 0 },
//     },
//     2: {
//         1: {
//             text: "it is cheap",
//             date: "November 29,2023 at 10:55 am",
//             likes: 4,
//         },
//     },
// };
const SingleProductPage = async ({ params }) => {
    let coordinatesArray = [36.77326479858625, 3.059852057256325]; // Default coordinates
    try {
        const location = await getCoordinates(params.id);

        // Check if location data exists
        if (location && location.length > 0) {
            const locationString = location[0].location;
            // Parsing the 'location' string into a JavaScript object
            const locationObject = JSON.parse(locationString);
            // Accessing the latitude and longitude values
            const latitude = locationObject.lat;
            const longitude = locationObject.long;
            coordinatesArray = [latitude, longitude]; // Update coordinatesArray
        } else {
            throw "Location data not found. Using default coordinates.";
            // Handle the absence of location data, if needed
        }
    } catch (error) {
        throw ("Error parsing locationString:", error);
        // Handle the error as needed
    }

    const productData = await getProductWithPrice(params.id);
    if (!productData) {
        notFound();
    }

    const userData = await getUserProfile(productData.uid);

    const additional_info = await getAdditionalInfo(params.id);

    const tabsTitle = ["Additionnal Information", "Location"];

    return (
        <div>
            <div className='p-1 flex flex-col sm:flex-row justify-evenly '>
                {productData && (
                    <div className='container mt-20 sm:w-1/2 sm:p-3 '>
                        <ProductDisplay product={productData} />
                    </div>
                )}
                <div className='container mt-20 sm:w-1/2 sm:p-3 '>
                    <ProductDetailSection
                        product={productData}
                        user={userData.raw_user_meta_data}
                    />
                </div>
            </div>

            {/* <DynamicMap /> */}

            <div className='m-5 py-5 flex justify-center items-center'>
                <TabsComponent
                    tabs={tabsTitle}
                    coord={coordinatesArray}
                    additional_info={additional_info}
                />
            </div>
            {/* <Comment userData={user} comments={commentData} reply={replyData} /> */}
        </div>
    );
};

export default SingleProductPage;
