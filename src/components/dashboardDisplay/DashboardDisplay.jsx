"use client";

import { useEffect, useState } from "react";

import { getItems } from "@/lib/supabase";

import ProductItem from "@/components/productItems/ProductItem";

import { useUser } from "../userProvider/UserProvider";

const DashboardDisplay = ({ type, fetchPurchases }) => {
    const { user } = useUser();
    const [data, setData] = useState(null);
    const [purchasedData, setPurchasedData] = useState(null);
    const [orders, setOrders] = useState(null);
    const fetchData = async () => {
        try {
            let table;
            let filterField;
            let filterValue;

            if (type === "borrowings") {
                table = "borrowings";
                filterField = "receiver";
                filterValue = user;
            } else if (type === "lendings") {
                table = "borrowings";
                filterField = "sender";
                filterValue = user;
            } else if (type === "sales") {
                table = "purchases";
                filterField = "sender";
                filterValue = user;
            } else if (type === "purchases") {
                table = "purchases";
                filterField = "receiver";
                filterValue = user;
            }

            const purchasedData = await fetchPurchases(
                table,
                filterField,
                filterValue
            );
            setPurchasedData(purchasedData);

            const ordersData = await getItems(
                "orders",
                type === "lendings" || type === "sales" ? "sender" : "receiver",
                user
            );
            setOrders(ordersData);

            // Combine and process data to determine the status
            const processedData = purchasedData.map((item) => {
                const foundInOrders = (ordersData || []).some(
                    (order) => order.productId === item.productId
                );
                const secondUser =
                    type === "lendings" || type === "sales"
                        ? item.receiver
                        : item.sender;
                if (foundInOrders) {
                    if (
                        purchasedData.some(
                            (purchase) => purchase.productId === item.productId
                        )
                    ) {
                        return {
                            ...item,
                            status: "pending",
                            second_user: secondUser,
                        };
                    } else {
                        return {
                            ...item,
                            status: "requested",
                            second_user: secondUser,
                        };
                    }
                } else {
                    return {
                        ...item,
                        status: "completed",
                        second_user: secondUser,
                    };
                }
            });

            setData(processedData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            // Handle the error accordingly, e.g., set an error state or show a message to the user
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, user]);

    return (
        <div className='flex flex-wrap gap-4'>
            {data?.length > 0 ? (
                data.map((item) => (
                    <ProductItem
                        key={item.productId}
                        fetchPurchases={fetchPurchases}
                        product={item}
                    />
                ))
            ) : (
                <div className='text-titleContent uppercase font-jost mt-24'>
                    no current items
                </div>
            )}
        </div>
    );
};

export default DashboardDisplay;
