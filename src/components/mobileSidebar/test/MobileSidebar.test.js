import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import MobileSidebar from "../MobileSidebar";
import messages from "../../../../messages/en.json";

jest.mock("next/navigation");
const pushMock = jest.fn();

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
