import { NextIntlClientProvider } from "next-intl";
import { Pagination } from "pagination-react-js";
import renderer from "react-test-renderer";

import messages from "@/../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <Pagination />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
