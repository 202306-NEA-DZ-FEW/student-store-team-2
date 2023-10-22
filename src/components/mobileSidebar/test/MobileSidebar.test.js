import renderer from "react-test-renderer";
import MobileSidebar from "../MobileSidebar";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";

jest.mock("next/navigation");
const pushMock = jest.fn();

it("renders correctly", () => {
    // Create a mock function for the 'navigation' prop
    const navigationMock = [];

    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <MobileSidebar navigation={navigationMock} />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
