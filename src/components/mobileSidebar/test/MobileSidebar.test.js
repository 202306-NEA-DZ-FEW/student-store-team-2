import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import MobileSidebar from "../MobileSidebar";
import messages from "../../../../messages/en.json";

jest.mock("next/navigation");
const pushMock = jest.fn();

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
    // Create a mock function for the 'navigation' prop
    const navigationMock = [];

    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UserProvider>
                    <MobileSidebar navigation={navigationMock} />
                </UserProvider>
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
