import { getCategories, getProductsLength } from "@/lib/firestore";

import Pagination from "@/components/pagination/Pagination";
import ProductCard from "@/components/productCard/ProductCard";
import MobileSideBar from "@/components/sidebars/mobileSidebar/MobileSideBar";
import ProductsFilterWrapper from "@/components/wrappers/productsFilterWrapper/ProductsFilterWrapper";
import { getProducts } from "@/lib/supabase";

const Page = async ({ searchParams }) => {
    // console.log("params", searchParams);

    const data = await getProducts();
    const dataLength = await getProductsLength();
    const categories = await getCategories();
    console.log("------------------------------------------------");
    console.log("length", data);

    return (
        <div className=' pt-1 pb-24'>
            <div className='wrapper  mt-48'>
                <div className='flex '>
                    <div className='px-6 hidden lg:block'>
                        <ProductsFilterWrapper categories={categories} />
                    </div>

                    <div className='w-full px-10 '>
                        <div className='grid-wrapper gap-y-14  gap-4 justify-center grid grid-cols-[repeat(1,308px)]  lg:grid-cols-[repeat(2,308px)] xl:grid-cols-[repeat(3,308px)] 2xl:grid-cols-[repeat(4,308px)] pb-10'>
                            {/* {data &&
                                data.map((product) => (
                                    <ProductCard
                                        key={product.pid}
                                        product={product}
                                        categories={categories}
                                    />
                                ))} */}
                        </div>

                        <Pagination length={dataLength} />
                    </div>
                </div>
            </div>
            {/* show only in mobile */}
            <MobileSideBar categories={categories} />
        </div>
    );
};

export default Page;
