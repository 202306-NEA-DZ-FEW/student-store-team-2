import { getCategories } from "@/lib/firestore";
import { getUsers } from "@/lib/supabase";

import AddProductForm from "@/components/addProduct/AddProductForm";

import DashboardDisplay from "../../../components/dashboardDisplay/DashboardDisplay";
import NavLinks from "../../../components/dashboardNavLinks/NavLinks";

const Page = async ({ searchParams }) => {
    const fetchPurchases = async (table, filterField, filterValue) => {
        "use server";
        // // Use Supabase function to fetch data with filter
        // const items = await getItems(table, filterField, filterValue);
        // // console.log("iteeems", items);
        // return items;
        return ["1"];
    };

    const data = await getUsers();
    console.log("daaaaata", data);

    // Fetch categories
    const categories = await getCategories();
    return (
        <div className='pb-40 h-screen'>
            <div className='w-full h-[1px] fixed top-16 bg-gray-200 z-30'></div>
            {/* <MyDashboard /> */}
            <div className='flex leading-6 tracking-wider mb-20'>
                <NavLinks />
                {searchParams.type === "List an Item" ? (
                    <div className='flex-1 p-4'>
                        <AddProductForm categories={categories} />
                    </div>
                ) : (
                    <div className='flex-1 flex-col justify-center p-4 mt-40 ml-20  xl:pl-48'>
                        {/* <SortingControl /> */}
                        <DashboardDisplay
                            fetchPurchases={fetchPurchases}
                            type={searchParams.type}
                        />
                    </div>
                )}

                <div className=''></div>
            </div>
        </div>
    );
};

export default Page;
