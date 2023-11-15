import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import Testimonials from "../Testimonials";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <Testimonials />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
