import { redirect } from "next/navigation";

import { getCurrentUser, readUserSession } from "@/lib/_supabaseAuth";
import { getCategories } from "@/lib/firestore";
import { getDashboardOrders } from "@/lib/supabase";

import AddProductForm from "@/components/addProduct/AddProductForm";
import DashboardDisplay from "@/components/dashboardDisplay/DashboardDisplay";

const Page = async ({ searchParams }) => {
    const { session } = await readUserSession();

    if (!session) {
        redirect("sign-in");
    }
    const { user } = await getCurrentUser();

    const data = await getDashboardOrders(
        searchParams.type || "stuff",
        user.id
    );
    // console.log("daaaaata", data);

    // Fetch categories
    const categories = await getCategories();
    return (
        <>
            {searchParams.type === "add product" ? (
                <div className='flex-1 p-4'>
                    <AddProductForm categories={categories} />
                </div>
            ) : (
                <DashboardDisplay
                    dashboardData={data}
                    type={searchParams.type}
                />
            )}
        </>
    );
};

export default Page;
