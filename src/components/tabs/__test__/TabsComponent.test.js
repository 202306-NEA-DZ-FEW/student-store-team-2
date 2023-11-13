import TabsComponent from "../TabsComponent";
import { NextIntlClientProvider } from "next-intl";
import { messages } from "../../../../messages/en.json";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <TabsComponent />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
