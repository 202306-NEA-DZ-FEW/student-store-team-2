import renderer from "react-test-renderer";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Testimonials from "../Testimonials";

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
