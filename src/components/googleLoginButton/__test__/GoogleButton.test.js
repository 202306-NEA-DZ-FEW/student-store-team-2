import renderer from "react-test-renderer";

import GoogleLoginButton from "../GoogleButton";

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
    const authInstance = require("firebase/auth").getAuth();
    // Mock methods or properties of authInstance as needed
    const googleAuthInstance = require("firebase/auth").GoogleAuthProvider();
    // Mock Firestore methods
    const firestoreInstance = require("firebase/firestore").getFirestore();
    const tree = renderer.create(<GoogleLoginButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
