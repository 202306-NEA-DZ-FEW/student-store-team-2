import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import messages from "@/../messages/en.json";

import StatusFilter from "../StatusFilter";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <StatusFilter />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
