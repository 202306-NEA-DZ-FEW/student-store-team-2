import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import Navbar from "../Navbar";
import messages from "../../../../messages/en.json";

// Mock the "next/navigation" module
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn(),
    })),
    usePathname: jest.fn(),
    useParams: () => ({
        locale: "en",
    }),
}));

// Mock Firebase Methods
jest.mock("firebase/auth", () => {
    const authInstance = {
        // Add mock methods and properties as needed
    };

    return {
        getAuth: jest.fn(() => authInstance),
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        // Add other authentication methods used in your code
    };
});
jest.mock("firebase/firestore", () => {
    return {
        getFirestore: jest.fn(),
        doc: jest.fn(),
        setDoc: jest.fn(),
        // Add other Firestore methods used in your code
    };
});

jest.mock("firebase/auth", () => {
    const authInstance = {
        // Add mock methods and properties as needed
    };

    return {
        getAuth: jest.fn(() => authInstance),
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        // Add other authentication methods used in your code
        GoogleAuthProvider: jest.fn(),
    };
});
jest.mock("firebase/firestore", () => {
    return {
        getFirestore: jest.fn(),
        doc: jest.fn(),
        setDoc: jest.fn(),
        // Add other Firestore methods used in your code
    };
});

it("renders correctly", async () => {
    const authInstance = require("firebase/auth").getAuth();
    // Mock methods or properties of authInstance as needed

    // Mock Firestore methods
    const firestoreInstance = require("firebase/firestore").getFirestore();
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UserProvider>
                    <Navbar />
                </UserProvider>
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
