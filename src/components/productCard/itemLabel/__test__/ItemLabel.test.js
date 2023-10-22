import renderer from "react-test-renderer";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../messages/en.json";
import ItemLabel from "../ItemLabel";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ItemLabel />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
