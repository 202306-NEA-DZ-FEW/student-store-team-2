"use client";

import { useEffect, useState } from "react";

import ProductItem from "@/components/productItems/ProductItem";

import { useUser } from "../userProvider/UserProvider";

const DashboardDisplay = ({ type, fetchPurchases }) => {
    const { user } = useUser();
    const [data, setData] = useState(null);
    const fetchData = async () => {
        try {
            let table;
            let filterField;
            let filterValue;

            if (type === "borrowings") {
                table = "borrowings";
                filterField = "borrowedTo";
                filterValue = user;
            } else if (type === "lendings") {
                table = "borrowings";
                filterField = "borrowedFrom";
                filterValue = user;
            } else if (type === "sales") {
                table = "purchases";
                filterField = "soldTo";
                filterValue = user;
            } else if (type === "purchases") {
                table = "purchases";
                filterField = "boughtFrom";
                filterValue = user;
            }
            fetchPurchases(table, filterField, filterValue).then((data) => {
                console.log("data in then", data);
                setData(data);
            });
            // console.log("result is", result);
            // setData(result);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            // Handle the error accordingly, e.g., set an error state or show a message to the user
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, user]);

    return (
        <div className='flex flex-wrap gap-4 w-fit'>
            <div>
                {data &&
                    data.map((item) => <ProductItem key={item.id} {...item} />)}
            </div>
        </div>
    );
};

export default DashboardDisplay;
