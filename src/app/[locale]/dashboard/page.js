import { collection, getDocs } from "firebase/firestore";
import React from "react";

import { db } from "@/lib/firebase";

import AddProductForm from "@/components/addProduct/AddProductForm";

import DashboardDisplay from "../../../components/dashboardDisplay/DashboardDisplay";
import { links } from "../../../components/dashboardNavLinks/NavLinks";
import NavLinks from "../../../components/dashboardNavLinks/NavLinks";
import MyListings from "../../../components/myListings/MyListings";
import SortingControl from "../../../components/sortingControl/SortingControl";

const Page = async ({ searchParams }) => {
    const colType = searchParams?.type ? searchParams.type : "borrowings";
    const categories = [];

    const querySnapshot = await getDocs(collection(db, colType));
    const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });

    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    categoriesSnapshot.forEach((doc) => {
        const categoryData = doc.data().categories; // Assuming 'categories' is the field
        categories.push(categoryData);
    });
    console.log(categories);

    return (
        <div className='pb-40'>
            <MyListings />
            <div className='flex leading-6  tracking-wider mb-20'>
                <NavLinks links={links} />
                {searchParams.type === "List an Item" ? (
                    <div className='flex-1 p-4'>
                        <AddProductForm categories={categories} />
                    </div>
                ) : (
                    <div className='flex-1 p-4'>
                        <SortingControl />
                        <DashboardDisplay data={data} />
                    </div>
                )}

                <div className='px-25'></div>
            </div>
        </div>
    );
};

export default Page;
