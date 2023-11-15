import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zvipwzqccgaxkfjxdnue.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export const getProducts = async (searchParams) => {
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
    try {
        const { data, error } = await supabase
            .from(table)
            .select("")
            .eq(filterField, filterValue);
        return data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

export const addItem = async (table, item) => {
    try {
        const { data, error } = await supabase.from(table).upsert([item]);

        if (error) {
            throw error;
        }
        console.log("added data", item);

        return data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

export const updateItem = async (table, item, user) => {
    const { data, error } = await supabase
        .from(table)
        .update({ ...item })
        .eq("id", user)
        .select("*");

    if (error) {
        throw error;
    }
    console.log("added data", data);

    return data;
};

export const getUserProfile = async (user) => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select(
                "id, birth_date, first_name, last_name, phone_num, profile_pic, institution, gender,location, userId"
            )
            .eq("id", user)
            .single();
        if (error) {
            throw error;
        }
        // Log the user profile data
        console.log("User profile data from Supabase:", data);
        return data;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
};

export const getProduct = async (productId) => {
    try {
        const { data, error } = await supabase
            .from("products")
            .select("")
            .eq("pid", productId)
            .single();
        if (error) {
            throw error;
        }
        // Log the user profile data
        console.log("Product data from Supabase:", data);
        return data;
    } catch (error) {
        console.error("Error getting product:", error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    const { offer_type, price, ...rest } = productData;

    try {
        // Add the remaining fields to the products table
        const { data: productDataResult, error: productDataError } =
            await supabase.from("products").upsert([rest]);

        if (productDataError) {
            console.error(
                "Error inserting data into products table:",
                productDataError
            );
            throw productDataError; // Rethrow the error to handle it in the calling code
        } else {
            console.log(
                "Data inserted into products table successfully:",
                productDataResult
            );
        }

        // Get the product ID (pid) from the inserted data
        const productId = productDataResult?.pid;

        // Create an item object for buy_offer or borrow_offer table
        const item = {
            pid: productId,
            price,
        };

        // Determine the table based on the offer_type
        const tableName =
            offer_type === "for_sale" ? "buy_offer" : "borrow_offer";

        // Add the item to the buy_offer or borrow_offer table
        const { data, error } = await supabase.from(tableName).upsert([item]);

        // Handle any potential errors
        if (error) {
            console.error(
                "Error inserting data into",
                tableName,
                "table:",
                error
            );
            throw error; // Rethrow the error to handle it in the calling code
        } else {
            console.log(
                "Data inserted into",
                tableName,
                "table successfully:",
                data
            );
        }

        return { productData: productDataResult, offerData: data };
    } catch (error) {
        console.error("Error adding product:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};
