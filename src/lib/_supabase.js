/**
 * The code is a collection of functions that interact with a Supabase database to perform various
 * operations such as retrieving products, adding items, creating orders, updating orders, getting user
 * profiles, and more.
 * @returns The code is exporting several functions and constants. The functions include `getProducts`,
 * `getItems`, `updateDashboardOrder`, `deleteDashboardOrder`, `getNotifications`, `setNotification`,
 * `updatedNotifications`, `addItem`, `createBorrow`, `createPurchase`, `updateItem`, `getUserProfile`,
 * `getProduct`, `addProduct`, `getProductWithPrice`, `getTestimonials
 */
"use server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

/**
 * The function creates a Supabase server client with cookie handling.
 * @returns The function `createSupabaseServerClient` is returning a promise that resolves to a
 * Supabase server client.
 */
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

/**
 * The `getProducts` function retrieves products from a Supabase server based on specified search
 * parameters.
 * @param searchParams - The `searchParams` parameter is an object that contains various search
 * parameters for filtering the products. Here are the possible properties of the `searchParams`
 * object:
 * @returns The `getProducts` function returns an object with two properties: `data` and `count`. The
 * `data` property contains the retrieved products from the Supabase server, while the `count` property
 * represents the total number of products that match the search parameters.
 */
export const getProducts = async (searchParams) => {
    const supabase = await createSupabaseServerClient();

    try {
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
        if (error) throw error;
        return { data, count };
    } catch (error) {
        return error;
    }
};

/**
 * The function `getItems` uses Supabase to retrieve data from a stored procedure called
 * "get_purchases_by_user" and returns the data.
 * @returns The `getItems` function is returning the `data` object received from the Supabase server.
 */
export const getItems = async () => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase.rpc("get_purchases_by_user");
        return data;
    } catch (error) {
        throw ("Error adding item:", error);
    }
};

/**
 * The function `getDashboardOrders` retrieves orders from a Supabase database based on the type of
 * dashboard page and the user ID.
 * @param type - The `type` parameter is a string that represents the type of dashboard page. It can
 * have one of the following values: "borrowings", "purchases", "lendings", "sales", or "stuff".
 * @param userId - The `userId` parameter is the unique identifier of the user for whom you want to
 * retrieve the dashboard orders. It is used to filter the orders based on the user's role and type of
 * dashboard page.
 * @returns the data retrieved from the Supabase database based on the specified type and userId.
 */
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

/**
 * The function updates the status of an order in a Supabase database table and revalidates the
 * dashboard path.
 * @param table - The "table" parameter is a string that specifies the type of table to update. It can
 * have two possible values: "for_borrow" or "for_purchase".
 * @param status - The `status` parameter is the new status value that you want to update for the
 * specified order.
 * @param orderId - The `orderId` parameter is the unique identifier of the order that needs to be
 * updated in the database.
 * @returns an object with two properties: "data" and "error".
 */
export const updateDashboardOrder = async (table, status, orderId) => {
    const supabase = await createSupabaseServerClient();
    const targetedDbTable = table === "for_borrow" ? "borrowings" : "purchases";

    const { data, error } = await supabase
        .from(targetedDbTable)
        .update({ status })
        .eq("id", orderId);

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

/**
 * The function `getNotifications` retrieves notifications from a Supabase server for a specific user.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom you want to
 * retrieve notifications.
 * @returns either an error object or an array of notification data.
 */
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

/**
 * The function sets a notification in a Supabase database with the provided notifier ID, notified ID,
 * data, and type.
 * @param notifierId - The `notifierId` parameter is the ID of the user who is triggering the
 * notification. This could be the ID of the user who performed an action that requires a notification
 * to be sent.
 * @param notifiedId - The `notifiedId` parameter is the ID of the user who will be notified.
 * @param data - The `data` parameter is an object that contains additional information or payload that
 * you want to include in the notification. It can be any data that you want to pass along with the
 * notification, such as a message, a link, or any other relevant information.
 * @param type - The `type` parameter is used to specify the type of notification being set. It can be
 * a string or any other data type that represents the type of notification.
 */
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
/**
 * The function updates the "viewed" field of notifications for a specific user in a Supabase database.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
 * update the notifications.
 */
export const updatedNotifications = async (userId) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("notifications")
        .update({ viewed: true })
        .eq("notified", userId);
};

/**
 * The `addItem` function is an asynchronous function that adds an item to a Supabase table using the
 * Supabase server client.
 * @param table - The `table` parameter is the name of the table in the Supabase database where you
 * want to add the item.
 * @param item - The `item` parameter is an object that represents the data you want to add to the
 * specified table. It should contain the necessary properties and their corresponding values that
 * match the schema of the table you are working with.
 * @returns the `data` object if there is no error. If there is an error, it will throw an error
 * message.
 */
export const addItem = async (table, item) => {
    const supabase = await createSupabaseServerClient();
    try {
        const { data, error } = await supabase.from(table).upsert([item]);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw ("Error adding item:", error);
    }
};

// create borrow order

/**
 * The function creates a new borrowing record in a Supabase database.
 * @param order - The `order` parameter is an object that represents the borrowing order. It contains
 * the necessary information for creating a new borrowing entry in the "borrowings" table.
 */
export const createBorrow = async (order) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase

        .from("borrowings")

        .insert(order);
    if (error) throw error;
};

// create purchase order
/**
 * The function creates a purchase by inserting an order into a Supabase database.
 * @param order - The `order` parameter is an object that represents the purchase order. It contains
 * the necessary information for creating a new purchase entry in the "purchases" table.
 */
export const createPurchase = async (order) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase

        .from("purchases")

        .insert(order);
};

/**
 * The `updateItem` function updates an item in a Supabase table based on the provided user ID.
 * @param table - The `table` parameter represents the name of the table in the database where the item
 * needs to be updated.
 * @param item - The `item` parameter represents the object containing the updated values for the item
 * you want to update in the Supabase table.
 * @param user - The `user` parameter is the identifier of the user whose item needs to be updated. It
 * is used in the `eq("id", user)` method to specify the condition for updating the item.
 * @returns The `updateItem` function is returning the updated data from the Supabase table.
 */
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

/**
 * The function `getUserProfile` retrieves a user's profile data from a Supabase server using their ID.
 * @param user - The `user` parameter is the ID of the user whose profile you want to retrieve.
 * @returns The `getUserProfile` function returns the data of a user's profile from the Supabase
 * server.
 */
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
        throw ("Error getting user:", error);
    }
};

/**
 * The function `getProduct` retrieves a single product from a Supabase server based on the provided
 * product ID.
 * @param productId - The `productId` parameter is the unique identifier of the product you want to
 * retrieve from the "products" table in the Supabase database.
 * @returns the data of the product with the specified productId.
 */
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
        throw ("Error getting product:", error);
    }
};

/**
 * The `addProduct` function is an asynchronous function that adds a new product to a Supabase database
 * along with its corresponding offer data.
 * @param productData - The `productData` parameter is an object that contains the data for the product
 * being added. It should have the following properties:
 * @returns The function `addProduct` returns an object with two properties: `productData` and
 * `offerData`.
 */
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
            throw (
                ("Error inserting data into products table:", productDataError)
            );
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
            throw ("Error inserting data into", tableName, "table:", error);
        }

        return { productData: productDataResult, offerData: data };
    } catch (error) {
        throw ("Error adding product:", error);
    }
};

/**
 * The function `getProductWithPrice` retrieves a product with its price from a Supabase server using
 * the provided product ID.
 * @param pid - The `pid` parameter is the unique identifier for a product. It is used to query the
 * database and retrieve the product with the specified `pid`.
 * @returns the data of a product with the specified pid (product ID) from the "products" table in the
 * Supabase server.
 */
export const getProductWithPrice = async (pid) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("products")
        .select(
            "pid,uid, image,name,condition,offer_type,description, categories!inner(*),sale_offer(price),borrow_offer(price)"
        )
        .eq("pid", pid)
        .single();
    if (error) {
        throw error;
    }
    return data;
};

/**
 * The function `getTestimonials` fetches testimonials data from a Supabase server and returns it.
 * @returns The `getTestimonials` function is returning the data fetched from the "testimonials" table
 * in the Supabase database.
 */
export const getTestimonials = async () => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("testimonials")
            .select("author, testimonial, rating");
        return data;
    } catch (error) {
        throw ("Error fetching testimonials:", error);
    }
};

/**
 * The function `getCategories` retrieves the `id` and `category_name` fields from the "categories"
 * table using Supabase and returns the data.
 * @returns The function `getCategories` returns a promise that resolves to an array of objects
 * containing the `id` and `category_name` properties of the categories retrieved from the "categories"
 * table in Supabase.
 */
export const getCategories = async () => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("categories")
        .select("id, category_name");
    if (error) {
        throw error;
    }
    return data;
};

/**
 * The `searchProduct` function uses Supabase to search for products with names that match a given
 * value.
 * @param value - The `value` parameter is the search term or keyword that you want to use to search
 * for products. It is used to filter the products based on their name.
 * @returns The function `searchProduct` returns the data of products that match the search value.
 */
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

/**
 * The function `getLatestProducts` retrieves the latest 8 products from a Supabase server and returns
 * the data.
 * @returns the latest 8 products from the "products" table in the Supabase database.
 */
export async function getLatestProducts() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

    if (error) {
        throw error;
    }

    return data;
}

/**
 * The function `getCoordinates` fetches the location data of a product from a Supabase server.
 * @param productId - The `productId` parameter is the unique identifier of a product. It is used to
 * query the Supabase database and retrieve the location coordinates associated with the specified
 * product.
 * @returns The `getCoordinates` function is returning the `data` object, which contains the location
 * information of the product with the specified `productId`.
 */
export const getCoordinates = async (productId) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("products")
            .select("location")
            .eq("pid", productId);
        return data;
    } catch (error) {
        throw ("Error fetching testimonials:", error);
    }
};

/**
 * The function `hasPurchased` checks if a user has purchased a specific product.
 * @param productId - The `productId` parameter is the ID of the product that you want to check if it
 * has been purchased.
 * @param userId - The `userId` parameter represents the ID of the user for whom we want to check if
 * they have purchased a specific product.
 * @returns a boolean value. It returns `true` if there is at least one purchase record in the
 * "purchases" table that matches the given `productId` and `userId`, and `false` otherwise.
 */
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
export const hasPurchased = async (productId, userId) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("purchases")
        .select()
        .eq("productId", productId)
        .eq("receiver", userId);

    if (error) {
        // Handle error, perhaps log it or display an error message
        return false;
    }

    return data.length > 0;
};

/**
 * The function `hasBorrowed` checks if a user has borrowed a specific product.
 * @param productId - The `productId` parameter is the ID of the product that you want to check if it
 * has been borrowed or not.
 * @param userId - The `userId` parameter represents the ID of the user for whom we want to check if
 * they have borrowed a specific product.
 * @returns a boolean value. It returns `true` if there is at least one borrowing record in the
 * "borrowings" table that matches the given `productId` and `userId`, and `false` otherwise.
 */
export const hasBorrowed = async (productId, userId) => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("borrowings")
        .select()
        .eq("productId", productId)
        .eq("receiver", userId);
    if (error) {
        // Handle error, perhaps log it or display an error message
        return false;
    }

    return data.length > 0;
};

/**
 * The `sendAdditionalInfo` function sends additional information to the 'additional_info' table in Supabase.
 * @param additionalInfoData - The `additionalInfoData` parameter is an object containing the additional information to be sent.
 * It should have the properties 'pid', 'title', 'description', and 'additional_information'.
 * @returns The function sends the provided additional information to the 'additional_info' table in Supabase.
 */
export const sendAdditionalInfo = async (additionalInfoData) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("additional_info")
            .upsert([additionalInfoData]);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw ("Error sending additional information:", error);
    }
};

/**
 * The function `getAdditionalInfo` fetches additional information for a given product ID from a
 * Supabase server.
 * @param productId - The `productId` parameter is the unique identifier of the product for which you
 * want to retrieve additional information. It is used to filter the records in the "additional_info"
 * table and fetch the relevant data.
 * @returns the data fetched from the "additional_info" table in the Supabase database, filtered by the
 * "pid" column matching the provided productId.
 */
export const getAdditionalInfo = async (productId) => {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("additional_info")
            .select()
            .eq("pid", productId);
        return data;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
    }
};
