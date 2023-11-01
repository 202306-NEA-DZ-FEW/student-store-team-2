import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import { app } from "./firebase";

const auth = getAuth(app); // app is your Firebase app instance
const db = getFirestore(app); // Use your Firestore instance

const googleProvider = new GoogleAuthProvider();

export const registerUserWithEmailAndPassword = async (
    email,
    password,
    userData
) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, userData);
        window.location.href = "/profile?page=form";
        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        window.location.href = "/profile?page=form";

        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
                unsubscribe(); // Don't forget to unsubscribe
            });
        });

        const uid = user ? user.uid : null;
        return uid;
    } catch (error) {
        console.error("Error getting current user:", error);
        throw error;
    }
};

export const signOutUser = async () => {
    try {
        window.location.href = "/";
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

export const handleGoogleLogin = async () => {
    try {
        // Sign in with Google popup
        const result = await signInWithPopup(auth, googleProvider);

        // The signed-in user info.
        const user = result.user;
        // Check if the user already exists in the database based on their UID
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // User doesn't exist in the database, so add them
            const userData = {
                // Define the user data here (e.g., name, email, etc.)
                first_name: user.displayName.split(" ")[0],
                last_name: user.displayName.split(" ")[1],
                email: user.email,
                profile_pic: user.photoURL,
            };

            await setDoc(userRef, userData);
        }
        window.location.href = "/profile?page=form";
    } catch (error) {
        console.error("Error signing in with google:", error);
    }
};
