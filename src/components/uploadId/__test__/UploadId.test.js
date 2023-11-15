import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import UploadId from "../UploadId";
import messages from "../../../../messages/en.json";
jest.mock("firebase/storage", () => {
    return {
        getDownloadURL: jest.fn(),
        getStorage: jest.fn(),
        ref: jest.fn(),
        uploadBytesResumable: jest.fn(),
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

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UploadId />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
