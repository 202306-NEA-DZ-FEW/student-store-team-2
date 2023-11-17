import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

// Import your Firebase app instance
import { app } from "./firebase";
import { addItem } from "./supabase";

const auth = getAuth(app);

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
        await addItem("users", {
            id: user.uid,
            email: user.email,
            ...userData,
        });
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
        window.location.href = "/dashboard";
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
                unsubscribe();
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
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const userData = {
            first_name: user.displayName.split(" ")[0],
            last_name: user.displayName.split(" ")[1],
            email: user.email,
            profile_pic: user.photoURL,
        };
        await addItem("users", { id: user.uid, ...userData });
        window.location.href = "/dashboard";
    } catch (error) {
        console.error("Error signing in with google:", error);
    }
};
