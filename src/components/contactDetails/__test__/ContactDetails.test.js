import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ContactDetails from "../ContactDetails/ContactDetails";
import messages from "../../../../messages/en.json";

it("render correnctly", () => {
    const user = { phone_num: "0556214761" };
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ContactDetails user={user} />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
