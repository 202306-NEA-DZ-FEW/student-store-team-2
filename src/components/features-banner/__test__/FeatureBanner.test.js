import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import FeatureBanner from "../FeatureBanner";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <FeatureBanner />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
