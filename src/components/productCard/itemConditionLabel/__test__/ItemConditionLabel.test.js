import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ItemConditionLabel from "../ItemConditionLabel";
import messages from "../../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ItemConditionLabel />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
