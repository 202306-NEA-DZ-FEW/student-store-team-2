import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import CheckoutForm from "../CheckoutForm";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <CheckoutForm />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
