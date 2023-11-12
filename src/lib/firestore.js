import {
    collection,
    doc,
    endAt,
    getCountFromServer,
    getDoc,
    getDocs,
    query,
    startAt,
    where,
} from "firebase/firestore";

import { db } from "./firebase";

export const getDocumentByIdFromFirestore = async (documentId) => {
    try {
        const usersCollection = collection(db, "users");
        const documentRef = doc(usersCollection, documentId);
        const documentSnapshot = await getDoc(documentRef);

        if (!documentSnapshot.exists()) {
            return null;
        }

        const documentName = documentSnapshot.data().first_name;

        return documentName;
    } catch (error) {
        console.error("Error fetching document from Firestore:", error);
        return null;
    }
};

export const getUserProfile = async (user) => {
    if (user) {
        const usersRef = collection(db, "users");
        const userRef = doc(usersRef, user);
        const userSnap = await getDoc(userRef);
        return userSnap.data();
    }
};

// get products from firebase

export const getProducts = async (searchParams) => {
    try {
        const categories = await getCategories();
        const productsRef = collection(db, "products");

        const conditions = [];
        // conditions.push(orderBy("price"));

        for (let key in searchParams) {
            switch (key) {
                case "minPrice":
                    conditions.push(
                        where("price", ">=", parseInt(searchParams[key]))
                    );
                    break;
                case "maxPrice":
                    conditions.push(
                        where("price", "<=", parseInt(searchParams[key]))
                    );
                    break;
                case "status":
                    switch (searchParams[key]) {
                        case "sale":
                            conditions.push(where("for_sale", "==", true));
                            break;

                        default:
                            conditions.push(where("for_borrow", "==", true));
                            break;
                    }
                    break;
                case "category":
                    conditions.push(
                        where(
                            "category",
                            "==",
                            categories.indexOf(searchParams[key])
                        )
                    );
                    break;
                case "note":
                    conditions.push(
                        where("condition", "==", parseInt(searchParams[key]))
                    );
                    break;

                case "page":
                    {
                        const productPerPage = 12;
                        const start =
                            (parseInt(searchParams[key]) - 1) * productPerPage;
                        const end =
                            parseInt(searchParams[key]) * productPerPage - 1;

                        conditions.push(startAt(start));
                        conditions.push(endAt(end));
                    }
                    break;

                default:
                    break;
            }
        }

        // conditions.push(orderBy("index"));
        // conditions.push(limit(12));
        const productsQuery = query(productsRef, ...conditions);
        // Execute the query using async/await
        const querySnapshot = await getDocs(productsQuery);
        let result = [];

        querySnapshot.forEach((doc) => {
            result.push({ pid: doc.id, ...doc.data() });
        });

        // return data
        return result;
    } catch (error) {
        return "error" + error.message;
    }
};

export const getCategories = async () => {
    try {
        const catRef = collection(db, "categories");
        const snapshot = await getDocs(catRef);
        let result = [];
        snapshot.forEach((doc) => result.push(doc.data()));
        return result[0].categories;
    } catch (error) {
        return error.message;
    }
};

// get products Length

export const getProductsLength = async () => {
    try {
        const coll = collection(db, "products");
        const snapshot = await getCountFromServer(coll);

        return snapshot.data().count;
    } catch (error) {
        return error.message;
    }
};
