import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import Testimonials from "../Testimonials";
import messages from "../../../../messages/en.json";

const testimonials = [];
it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <Testimonials testimonials={testimonials} />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
