import renderer from "react-test-renderer";

import { UserProvider } from "../UserProvider";
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
jest.mock("firebase/firestore", () => {
    return {
        getFirestore: jest.fn(),
        doc: jest.fn(),
        setDoc: jest.fn(),
        // Add other Firestore methods used in your code
    };
});

it("renders correctly", () => {
    const tree = renderer.create(<UserProvider />).toJSON();
    expect(tree).toMatchSnapshot();
});
