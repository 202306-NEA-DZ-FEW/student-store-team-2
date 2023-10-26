import {
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { app } from "./firebase";
import Cookies from "js-cookie";

const auth = getAuth(app); // app is your Firebase app instance
const db = getFirestore(app); // Use your Firestore instance

// Function to remove old cookies
const removeCookies = () => {
    Cookies.remove("authToken");
};

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

        Cookies.set("authToken", user.uid, {
            expires: 7,
            httpOnly: true,
            secure: true,
        });

        console.log("User registered successfully:", user.uid);
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

        console.log("User logged in successfully:", userCredential.user.uid);
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
        console.log("Current user:", uid);
        return uid;
    } catch (error) {
        console.error("Error getting current user:", error);
        throw error;
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
        Cookies.remove("authToken");
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};
