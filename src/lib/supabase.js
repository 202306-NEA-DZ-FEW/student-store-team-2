"use server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import { getCurrentUser } from "./_supabaseAuth";

export default async function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,

        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name, options) {
                    cookieStore.set({ name, value: "", ...options });
                },
            },
        }
    );
}

// const supabase = createClient(
//     "https://zvipwzqccgaxkfjxdnue.supabase.co",
//     process.env.NEXT_PUBLIC_SUPABASE_API_KEY
// );

export const getProducts = async (searchParams) => {
    const supabase = await createSupabaseServerClient();

    try {
        let countQuery = null;
        let query = supabase.from("products");
        query = query.select(
            "pid,image,name,condition,offer_type, categories!inner(*),sale_offer(price),borrow_offer(price)",
            { count: "planned" }
        );

        query = query.or([
            "borrow_offer.not.is.null",
            "sale_offer.not.is.null",
        ]);

        for (let key in searchParams) {
            switch (key) {
                case "minPrice":
                    query = query.gte(
                        "borrow_offer.price",
                        parseInt(searchParams[key])
                    );
                    query = query.gte(
                        "sale_offer.price",
                        parseInt(searchParams[key])
                    );

                    break;
                case "maxPrice":
                    query = query.lte(
                        "borrow_offer.price",
                        parseInt(searchParams[key])
                    );
                    query = query.lte(
                        "sale_offer.price",
                        parseInt(searchParams[key])
                    );

                    break;
                case "status":
                    switch (searchParams[key]) {
                        case "sale":
                            query = query.eq("offer_type", "for_sale");
                            break;

                        default:
                            query = query.eq("offer_type", "for_borrow");
                            break;
                    }
                    break;
                case "category":
                    query = query.eq(
                        "categories.category_name",
                        searchParams[key]
                    );
                    break;
                case "note":
                    query = query.eq("condition", parseInt(searchParams[key]));
                    break;

                case "page":
                    {
                        const productPerPage = 12;
                        const start =
                            (parseInt(searchParams[key]) - 1) * productPerPage;
                        const end =
                            parseInt(searchParams[key]) * productPerPage - 1;

                        query = query.range(start, end);
                    }
                    break;

                default:
                    break;
            }
        }

        const { data, count, error } = await query;

        return { data, count };
    } catch (error) {
        return error;
    }
};

export const getItems = async (table, filterField, filterValue) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase.rpc("get_purchases_by_user");

        return data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

export const getDashboardOrders = async (type, userId) => {
    const supabase = await createSupabaseServerClient();
    // return the view name depend on the type of the dashboard page
    const dashboardOrdersView = {
        borrowings: "user_borrowings_view",
        purchases: "user_purchases_view",
        lendings: "user_lendings_view",
        sales: "user_sales_view",
        stuff: "user_stuff_view",
    };

    // figure out by type what is the role of the current user
    const userRole = {
        borrowings: "receiver",
        purchases: "receiver",
        lendings: "sender",
        sales: "sender",
        stuff: "uid",
    };

    try {
        const { data, error } = await supabase
            .from(dashboardOrdersView[type])
            .select("*")
            .eq(userRole[type], userId);

        return data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

export const updateDashboardOrder = async (table, status, orderId) => {
    const supabase = await createSupabaseServerClient();
    console.log("updating", table, status, orderId);
    const targetedDbTable = table === "for_borrow" ? "borrowings" : "purchases";

    const { data, error } = await supabase
        .from(targetedDbTable)
        .update({ status })
        .eq("id", orderId);
    console.log("ddddd", error);

    revalidatePath("/dashboard");
    return { data, error };
};

export const deleteDashboardOrder = async (table, id) => {
    const supabase = await createSupabaseServerClient();

    const targetedDbTable = table === "for_borrow" ? "borrowings" : "purchases";
    const { data, error } = await supabase
        .from(targetedDbTable)
        .delete()
        .eq("id", id);

    revalidatePath("/dashboard");
    return { data, error };
};

// get notifications

export const getNotifications = async (userId) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("notifications")
        .select()
        .eq("notified", userId)
        .order("created_at", { ascending: false });
    if (error) {
        return error;
    }
    return data;
};

// insert new notification

export const setNotification = async (notifierId, notifiedId, data, type) => {
    const supabase = await createSupabaseServerClient();
    const { raw_user_meta_data: notifier_data } = await getUserProfile(
        notifierId
    );

    const { error: err } = await supabase.from("notifications").insert({
        notifier: notifierId,
        notified: notifiedId,
        data: { ...data, notifier_data },
        type,
    });
};

// set notifications to seen when user click on notificaion
export const updatedNotifications = async (userId) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("notifications")
        .update({ viewed: true })
        .eq("notified", userId);
};
export const addItem = async (table, item) => {
    const supabase = await createSupabaseServerClient();
    try {
        const { data, error } = await supabase.from(table).upsert([item]);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

// create borrow order

export const createBorrow = async (order) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase

        .from("borrowings")

        .insert(order);
};

// create purchase order
export const createPurchase = async (order) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase

        .from("purchases")

        .insert(order);
};

export const updateItem = async (table, item, user) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from(table)
        .update({ ...item })
        .eq("id", user)
        .select("*");

    if (error) {
        throw error;
    }

    return data;
};

export const getUserProfile = async (user) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("users_view")
            .select()
            .eq("id", user)
            .single();

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
};

export const getProduct = async (productId) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("products")
            .select("")
            .eq("pid", productId)
            .single();
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error getting product:", error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    const supabase = await createSupabaseServerClient();

    const newUuid = uuidv4();

    try {
        const { offer_type, price, ...rest } = productData;
        rest.offer_type = offer_type;
        rest.pid = newUuid;
        const { data: productDataResult, error: productDataError } =
            await supabase.from("products").upsert(rest).select("*");

        if (productDataError) {
            console.error(
                "Error inserting data into products table:",
                productDataError
            );
            throw productDataError;
        }

        const productId = productDataResult[0].pid;

        const item = {
            productId,
            price,
        };

        const tableName =
            offer_type === "for_sale" ? "sale_offer" : "borrow_offer";

        const { data, error } = await supabase.from(tableName).upsert(item);

        if (error) {
            console.error(
                "Error inserting data into",
                tableName,
                "table:",
                error
            );
            throw error; // Rethrow the error to handle it in the calling code
        }

        return { productData: productDataResult, offerData: data };
    } catch (error) {
        console.error("Error adding product:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

export const getProductWithPrice = async (pid) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("products")
        .select(
            "pid,image,name,condition,offer_type, categories!inner(*),sale_offer(price),borrow_offer(price)"
        )
        .eq("pid", pid)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

export const getTestimonials = async () => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase.from("testimonials").select("*");
        return data;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
    }
};

export const searchProduct = async (value) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("products")
        .select("name, pid")
        .ilike("name", `%${value}%`);

    if (error) {
        throw error;
    }

    return data;
};

export const getCoordinates = async (productId) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("products")
            .select("location")
            .eq("pid", productId);
        return data;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
    }
};

// get all user connections

export const getUserConnections = async () => {
    const { user } = await getCurrentUser();

    const supabase = await createSupabaseServerClient();
    const { data: data1, error: error1 } = await supabase.rpc("get_users_ids", {
        p_user_id: user.id,
    });

    if (data1) {
        const connectionIds = data1.map((user) => user.userid);

        // get connections data
        const { data: data2, error: error2 } = await supabase
            .from("users_view")
            .select("*")
            .in("id", connectionIds);
        return { name: user.user_metadata.full_name, connections: data2 };
    }

    return { name: user.user_metadata.full_name, connections: [] };
};

// search for exisitng room if not create one

export const createOrGetRoom = async (user1, user2) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .or(
            `and(user1.eq.${user1},user2.eq.${user2}),and(user1.eq.${user2},user2.eq.${user1}))`
        );
    if (data?.length > 0) return data[0].id;
    else {
        const { data, error } = await supabase
            .from("rooms")
            .insert({ user1, user2 })
            .select();

        return data[0].id;
    }
};

export const insertNewMessage = async (userId, content, roomId) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("messages")
        .insert({ userId, content, roomId })
        .select();

    return data;
};

// get message between two users

export const getRoomMessages = async (roomId) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("messages")
        .select("")
        .eq("roomId", roomId);

    return data;
};
