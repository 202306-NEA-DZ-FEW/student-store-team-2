import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import AuthFooter from "../AuthFooter";
import messages from "../../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <AuthFooter />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
