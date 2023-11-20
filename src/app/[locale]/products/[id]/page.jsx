import Comment from "@/components/comment/Comment";
import ProductDisplay from "@/components/product-display/ProductDisplay";
import ProductDetailSection from "@/components/productDetailsSection/ProductDetailSection";
// Placeholder object to be replaced with data from Firestore
const userData = {
    first_name: "Mohammed",
    last_name: "Bennaceur",
    birth_date: "29 octobre 2000",
    gender: "male",
    email: "bennaceurm@gmail.com",
    phoneNumber: "777112233",
    address: {
        building: "villa N°15",
        street: "Boulvard des martyres",
        city: "Ghazaouat",
        state: "Tlemcen",
    },
    institution: "Abou Bekr Belkaid University of Tlemcen",
    profile_pic:
        "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
const commentData = {
    1: {
        text: "i like that product <3 ",
        date: "November 14,2023 at 11:55 pm",
        likes: 2,
    },
    2: {
        text: "what's the price",
        date: "November 29,2023 at 01:55 am",
        likes: 0,
    },
};
const replyData = {
    1: {
        1: {
            text: "me too",
            date: "November 14,2023 at 11:59 pm",
            likes: 1,
        },
        2: { text: "i don't", date: "November 15,2023 at 10:55 am", likes: 0 },
    },
    2: {
        1: {
            text: "it is cheap",
            date: "November 29,2023 at 10:55 am",
            likes: 4,
        },
    },
};

// Placeholder object to be replaced with data from Firestore
const product = {
    name: "circle dining table",
    description:
        "Tristique ullamcorper nunc egestas non. Justo, cum feugiat imperdiet nulla molestie ac vulputate scelerisque amet. Bibendum adipiscing platea blandit sit sed quam semper rhoncus. Diam ultrices maecenas consequat eu tortor. Orci, cras lectus mauris, cras egestas quam venenatis neque.",
    condition: "6",
    price: {
        borrow_price: "20",
        sell_price: "100",
    },
    category: "Fourniture",
};
const page = () => {
    return (
        <div>
            <div className='p-1 flex w-full justify-evenly '>
                <div className='container mt-20 w-2/3 ml-40 '>
                    <ProductDisplay />
                </div>
                <div className='w-full container mt-20 '>
                    <ProductDetailSection
                        productData={product}
                        user={userData}
                    />
                </div>
            </div>
            <Comment user={userData} comments={commentData} reply={replyData} />
        </div>
    );
};

export default page;
