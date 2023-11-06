import AddProductForm from "@/components/addProduct/AddProductForm";

const categories = [];
const page = () => {
    return (
        <div className='relative  pt-32 '>
            <AddProductForm categories={categories} />
        </div>
    );
};

export default page;
