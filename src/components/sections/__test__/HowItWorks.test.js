import renderer from "react-test-renderer";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import HowItWorks from "../HowItWorks";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <HowItWorks />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
