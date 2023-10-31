import { collection, doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

import { getCurrentUser } from "./authDetails";
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

export const getCurrentUserData = async () => {
    const authToken = Cookies.get("authToken");
    const currentUser = await getCurrentUser(authToken);
    const currentUserData = await getUserProfile(currentUser);
    return currentUserData;
};
