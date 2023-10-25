import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import app from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app); // app is your Firebase app instance
const db = getFirestore(app); // Use your Firestore instance

export const registerUserWithEmailAndPassword = async (
    email,
    password,
    userData
) => {
    // eslint-disable-next-line no-useless-catch
    try {
        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Write user data to Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, userData);

        return user;
    } catch (error) {
        throw error;
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        // Sign in the user using email and password
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Return the user
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};
