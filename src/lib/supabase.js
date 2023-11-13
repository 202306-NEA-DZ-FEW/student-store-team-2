import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zvipwzqccgaxkfjxdnue.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export const getProducts = async (searchParams) => {
    try {
        let query = supabase.from("products");
        query = query.select(
            `name,pid,condition,image, borrow_offer ( * ), sale_offer( * )`
        );
        // query = query.select(`name, borrow_offer ( * )`);
        query = query.gt("borrow_offer.price", 50);
        query = query.gt("sale_offer.price", 50);
        query = query.or([
            "borrow_offer.not.is.null",
            "sale_offer.not.is.null",
        ]);
        // .and(not("borrow_offer.price", "is", null));
        // query = query.order("id", {
        //     foreignTable: "borrow_offer",
        //     ascending: true,
        // });
        query = query.limit(10);
        const { data, error } = await query;

        // const { data, error } = await supabase
        //     .from("products")
        //     .select("name,pid , sale_offer ( * )");

        console.log("error ", error);
        return data;
    } catch (error) {
        return error;
    }
};
