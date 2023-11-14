import { getItems } from "@/lib/supabase";

import AddProductForm from "@/components/addProduct/AddProductForm";

import DashboardDisplay from "../../../components/dashboardDisplay/DashboardDisplay";
import NavLinks from "../../../components/dashboardNavLinks/NavLinks";
import MyDashboard from "../../../components/myListings/MyDashboard";
import SortingControl from "../../../components/sortingControl/SortingControl";

const Page = async ({ searchParams }) => {
    const categories = [];

    const fetchPurchases = async (table, filterField, filterValue) => {
        "use server";
        // Use Supabase function to fetch data with filter
        const { data: items, error } = await getItems(
            table,
            filterField,
            filterValue
        );
        console.log("items are", items);
        if (error) {
            console.error("Error fetching items:", error.message);
            // Handle the error accordingly
            return <div>Error fetching data</div>;
        }
        return items;
    };

    // // Fetch categories
    // const { data: categoriesData, error: categoriesError } = await getItems(
    //     "categories"
    // );

    // if (categoriesError) {
    //     console.error("Error fetching categories:", categoriesError.message);
    //     // Handle the error accordingly
    //     return <div>Error fetching categories</div>;
    // }

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
                    <div className='flex-1 flex-col justify-center p-4 w-2/3 lg:pl-48 xl:pl-48'>
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
