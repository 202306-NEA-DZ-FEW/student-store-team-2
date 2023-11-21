import { NextIntlClientProvider } from "next-intl";
import { messages } from "../../../../../messages/en.json";
import renderer from "react-test-renderer";
import AdditionalInfoTab from "../AdditionalInfoTab";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <AdditionalInfoTab />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
