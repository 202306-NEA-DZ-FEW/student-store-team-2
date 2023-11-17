import { getCategories } from "@/lib/firestore";
import { getItems } from "@/lib/supabase";

import AddProductForm from "@/components/addProduct/AddProductForm";

import DashboardDisplay from "../../../components/dashboardDisplay/DashboardDisplay";
import NavLinks from "../../../components/dashboardNavLinks/NavLinks";
import MyDashboard from "../../../components/myListings/MyDashboard";
import SortingControl from "../../../components/sortingControl/SortingControl";

const Page = async ({ searchParams }) => {
    const fetchPurchases = async (table, filterField, filterValue) => {
        "use server";
        // Use Supabase function to fetch data with filter
        const items = await getItems(table, filterField, filterValue);

        return items;
    };

    // Fetch categories
    const categories = await getCategories();
    return (
        <div className='pb-40'>
            <MyDashboard />
            <div className='flex leading-6 tracking-wider mb-20'>
                <NavLinks />
                {searchParams.type === "List an Item" ? (
                    <div className='flex-1 p-4'>
                        <AddProductForm categories={categories} />
                    </div>
                ) : (
                    <div className='flex-1 flex-col justify-center p-4 items-center   xl:pl-48'>
                        <SortingControl />
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
