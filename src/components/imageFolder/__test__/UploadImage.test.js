import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import UploadImage from "../UploadImage";
import messages from "../../../../messages/en.json";
jest.mock("firebase/storage", () => {
    return {
        getDownloadURL: jest.fn(),
        getStorage: jest.fn(),
        ref: jest.fn(),
        uploadBytesResumable: jest.fn(),
    };
});
it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UploadImage />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
