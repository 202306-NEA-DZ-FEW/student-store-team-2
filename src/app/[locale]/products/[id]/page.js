import { notFound } from "next/navigation";

import { getAdditionalInfo, getCoordinates } from "@/lib/_supabase";
import { getProductWithPrice, getUserProfile } from "@/lib/_supabase";

import ProductDisplay from "@/components/product-display/ProductDisplay";
import ProductDetailSection from "@/components/productDetailsSection/ProductDetailSection";
import TabsComponent from "@/components/tabs/TabsComponent";

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
                <div className='container sm:mt-20  sm:w-1/2 sm:p-3 flex items-center  '>
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
