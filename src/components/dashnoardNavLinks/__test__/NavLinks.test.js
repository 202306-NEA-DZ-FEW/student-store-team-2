import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import NavLinks from "../NavLinks";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <NavLinks />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
