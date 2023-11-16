import { NextIntlClientProvider } from "next-intl";
import { messages } from "../../../../../messages/en.json";
import renderer from "react-test-renderer";
import LocationTab from "../LocationTab";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <LocationTab />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
