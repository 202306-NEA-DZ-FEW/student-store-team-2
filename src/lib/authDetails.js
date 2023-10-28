import {
    createUserWithEmailAndPassword,
    getAuth,
    getIdToken,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";

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
        await signOut(auth);
        Cookies.remove("authToken");
        window.location.href = "/";
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

export const handleGoogleLogin = async () => {
    try {
        // Sign in with Google popup
        const result = await signInWithPopup(auth, googleProvider);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.idToken;

        // The signed-in user info.
        const user = result.user;

        // Check if the user already exists in the database based on their UID
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // User doesn't exist in the database, so add them
            const userData = {
                // Define the user data here (e.g., name, email, etc.)
                fullName: user.displayName,
                email: user.email,
            };

            await setDoc(userRef, userData);
        }

        // Send user data and authToken in a POST request
        const authToken = Cookies.get("authToken");

        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                formType: "google-login",
                token: token,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set("authToken", data.user.uid, { expires: 7 });
            window.location.href = "/";
        } else {
            const errorData = await response.json();
            console.error("Google login error:", errorData.error);
        }
    } catch (error) {
        console.error("Google login error:", error);
    }
};

export const handleServerGoogleLogin = async (token) => {
    try {
        // Verify and sign in with the Google ID token
        const credential = GoogleAuthProvider.credential(token);
        const authResult = await signInWithCredential(auth, credential);

        // Get the user and their UID
        const user = authResult.user;
        const uid = user.uid;

        // Refresh the user's ID token
        const refreshedIdToken = await getIdToken(user, true);

        // Check if the user exists in the database based on their UID
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            // User doesn't exist in the database, so add them
            const userData = {
                fullName: user.displayName,
                email: user.email,
            };

            await setDoc(userRef, userData);
        }

        return user;
    } catch (error) {
        console.error("Server Google login error:", error);
        throw error;
    }
};
