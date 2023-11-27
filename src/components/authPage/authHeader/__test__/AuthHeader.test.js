import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import AuthHeader from "../AuthHeader";
import messages from "../../../../../messages/en.json";

it("renders correctly", () => {
    const title = "LOGIN";
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <AuthHeader title={title} />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
