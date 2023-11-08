import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import MyListings from "@/components/myListings/MyListings";

import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <MyListings />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
