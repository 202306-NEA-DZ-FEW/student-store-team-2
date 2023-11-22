import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import Footer from "../Footer";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <Footer />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});