import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import SortingControl from "../SortingControl";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <SortingControl />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
