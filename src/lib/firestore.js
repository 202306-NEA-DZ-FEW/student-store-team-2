import {
    collection,
    doc, // Import the 'doc' function
    getDoc, // Import the 'getDoc' function
    getFirestore,
} from "firebase/firestore";

import { db } from "./firebase";

export const getDocumentByIdFromFirestore = async (documentId) => {
    try {
        const usersCollection = collection(db, "users");
        const documentRef = doc(usersCollection, documentId);
        const documentSnapshot = await getDoc(documentRef);

        if (!documentSnapshot.exists()) {
            console.log("No document found in Firestore with this ID.");
            return null;
        }

        const documentName = documentSnapshot.data().fullName;

        return documentName;
    } catch (error) {
        console.error("Error fetching document from Firestore:", error);
        return null;
    }
};
