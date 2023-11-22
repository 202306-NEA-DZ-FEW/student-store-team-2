import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { getProductWithPrice, getUserProfile } from "@/lib/supabase";

import ProductDisplay from "@/components/product-display/ProductDisplay";
import ProductDetailSection from "@/components/productDetailsSection/ProductDetailSection";
import TabsComponent from "@/components/tabs/TabsComponent";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
});

// // Placeholder object to be replaced with data from Firestore
// const userData = {
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

// // Placeholder object to be replaced with data from Firestore
// const product = {
//     name: "circle dining table",
//     description:
//         "Tristique ullamcorper nunc egestas non. Justo, cum feugiat imperdiet nulla molestie ac vulputate scelerisque amet. Bibendum adipiscing platea blandit sit sed quam semper rhoncus. Diam ultrices maecenas consequat eu tortor. Orci, cras lectus mauris, cras egestas quam venenatis neque.",
//     condition: "6",
//     price: {
//         borrow_price: "20",
//         sell_price: "100",
//     },
//     category: "Fourniture",
// };

// Placeholder object to be replaced with data from Firestore
const sections = [
    {
        title: "Additionnal Information",
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget placerat nulla. Vivamus enim nunc, mattis et dignissim vitae, tristique vitae est. Donec quis egestas dolor. Mauris vehicula ut purus at accumsan. Sed quis dolor iaculis, posuere enim at, suscipit tortor. Fusce ultrices ligula ut tortor pellentesque, vel fringilla nisi lobortis. Morbi justo risus, fringilla vitae viverra vitae, luctus nec ipsum. Suspendisse ultrices et urna quis ornare. Praesent facilisis turpis at luctus lacinia. Sed egestas aliquet felis a convallis. Vestibulum euismod imperdiet pharetra. Nulla consectetur, tellus id tincidunt tempus, justo eros volutpat lacus, sit amet tempor nulla arcu vel mi. Donec aliquam vestibulum felis, nec tincidunt dolor accumsan et. Sed dignissim posuere dolor, pulvinar accumsan enim luctus eget. Mauris placerat felis felis, eu semper ex sollicitudin id.<br/> Aliquam pharetra fermentum tempor. Morbi tristique tincidunt felis. Maecenas libero lacus, sollicitudin non cursus vitae, aliquet in eros. Nullam tristique ligula non tellus volutpat, ut vestibulum mi pretium. Donec eu egestas massa. Proin pulvinar, erat et vestibulum efficitur, eros ex tristique libero, ac gravida dolor tortor non nunc. Suspendisse massa erat, viverra id magna in, condimentum viverra purus. Etiam ultrices non nisl a pharetra. Fusce pellentesque libero vel nisl lobortis, a pulvinar mauris facilisis. Proin dictum rhoncus mi sed ullamcorper. Vestibulum maximus erat ac arcu sollicitudin efficitur. Nulla facilisi. Duis nisi nisi, tincidunt non ultricies id, fermentum quis enim. Quisque leo mauris, commodo quis vulputate rhoncus, feugiat a urna. Integer sodales massa ac orci accumsan, vitae molestie ante bibendum.<br/>  Phasellus justo tortor, egestas id finibus in, lobortis at nunc. Curabitur ante enim, porta nec posuere et, vulputate at arcu. Etiam id lectus eget risus pretium convallis. Donec vel nisi dignissim, pretium ipsum ac, venenatis arcu. Sed sit amet arcu tempor, sagittis arcu eu, tristique nulla. Sed sed pellentesque turpis. Vivamus dictum convallis magna, vel aliquet felis sagittis ac.",
            title: "Title Test 1",
        },
    },
    {
        title: "Location",
        location: "Location - Maps",
    },
];

const SingleProductPage = async ({ params }) => {
    // const categories = await getCategories(params.category);
    // console.log("categories", categories);

    const productData = await getProductWithPrice(params.id);
    if (!productData) {
        notFound();
    }

    const userData = await getUserProfile(
        "9bba8715-d89b-4ea5-8942-25cc0aa6d45e"
    );

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

            <DynamicMap />

            <div className='m-5 py-5 flex justify-center items-center'>
                <TabsComponent tabs={sections} />
            </div>
        </div>
    );
};

export default SingleProductPage;
