import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ItemLabel from "../ItemLabel";
import messages from "../../../../../messages/en.json";

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
