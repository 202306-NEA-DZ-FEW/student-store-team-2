"use server";
import {
    collection,
    doc,
    getCountFromServer,
    getDoc,
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

export const getLatestIndex = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    const latestIndex = snapshot.data().count - 1;
    return latestIndex;
};
