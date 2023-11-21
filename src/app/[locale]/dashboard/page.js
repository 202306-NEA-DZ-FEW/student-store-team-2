import { redirect } from "next/navigation";

import { getCurrentUser, readUserSession } from "@/lib/_supabaseAuth";
import { getCategories } from "@/lib/firestore";
import { getDashboardOrders } from "@/lib/supabase";

import AddProductForm from "@/components/addProduct/AddProductForm";
import DashboardDisplay from "@/components/dashboardDisplay/DashboardDisplay";

import NavLinks from "../../../components/dashboardNavLinks/NavLinks";

const Page = async ({ searchParams }) => {
    const { session } = await readUserSession();

    if (!session) {
        redirect("sign-in");
    }
    const { user } = await getCurrentUser();
    console.log("useeeeeeeeee", user);
    console.log("iddddddddddddd", user.id);

    const data = await getDashboardOrders(searchParams.type, user.id);
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
                    <div className='flex-1 flex-col justify-center p-4 mt-40   sm:ml-64'>
                        {/* <SortingControl /> */}
                        <DashboardDisplay
                            dashboardData={data}
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
