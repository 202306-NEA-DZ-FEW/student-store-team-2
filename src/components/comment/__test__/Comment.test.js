import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import Comment from "../Comment";
import messages from "../../../../messages/en.json";

it("render correnctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <Comment />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
