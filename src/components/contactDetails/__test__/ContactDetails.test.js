import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ContactDetails from "../ContactDetails/ContactDetails";
import messages from "../../../../messages/en.json";

it("render correnctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ContactDetails />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
