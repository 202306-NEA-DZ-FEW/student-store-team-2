import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import GoogleLoginButton from "../GoogleButton";
import messages from "../../../../messages/en.json";

jest.mock("next/navigation");
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
jest.mock("@supabase/supabase-js", () => {
    return {
        ...jest.requireActual("@supabase/supabase-js"), // Use the actual module for non-mocked parts
        createClient: jest.fn(() => ({
            from: jest.fn(() => ({
                select: jest.fn(() => ({
                    eq: jest.fn(() => ({
                        // Customize the behavior of your Supabase queries as needed
                        data: { id: 123, name: "John Doe" },
                        error: null,
                    })),
                })),
            })),
        })),
    };
});

it("renders correctly", () => {
    const authInstance = require("firebase/auth").getAuth();
    // Mock methods or properties of authInstance as needed
    const googleAuthInstance = require("firebase/auth").GoogleAuthProvider();
    // Mock Firestore methods
    const firestoreInstance = require("firebase/firestore").getFirestore();
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <GoogleLoginButton />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
