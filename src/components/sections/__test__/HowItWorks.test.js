import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import HowItWorks from "../HowItWorks";
import messages from "../../../../messages/en.json";

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
