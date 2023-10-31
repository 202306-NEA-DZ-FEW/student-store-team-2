import { collection, getDocs } from "firebase/firestore";
import React from "react";

import { db } from "@/lib/firebase";

import DashboardDisplay from "../../../components/dashboardDisplay/DashboardDisplay";
import { links } from "../../../components/dashnoardNavLinks/NavLinks";
import NavLinks from "../../../components/dashnoardNavLinks/NavLinks";
import MyListings from "../../../components/myListings/MyListings";
import SortingControl from "../../../components/sortingControl/SortingControl";

const Page = async ({ searchParams }) => {
    const colType = searchParams?.type ? searchParams.type : "borrowings";

    const querySnapshot = await getDocs(collection(db, colType));
    const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });

    return (
        <div className='pb-40'>
            <MyListings />
            <div className='flex leading-6  tracking-wider mb-20'>
                <NavLinks links={links} />
                <div className='flex-1p-4'>
                    <SortingControl />
                    <DashboardDisplay data={data} />
                </div>
                <div className='px-25'></div>
            </div>
        </div>
    );
};

export default Page;
