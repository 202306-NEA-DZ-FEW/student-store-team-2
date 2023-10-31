import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import AddedGrid from "../AddedGrid";
import messages from "../../../../messages/en.json";
it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <AddedGrid />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
