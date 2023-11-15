import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import messages from "@/../messages/en.json";

import CategoryFilter from "../CategoryFilter";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <CategoryFilter />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
