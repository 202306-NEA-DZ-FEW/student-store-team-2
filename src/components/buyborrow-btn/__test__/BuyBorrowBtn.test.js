import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import BuyBorrowBtn from "../BuyBorrowBtn";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <BuyBorrowBtn />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
