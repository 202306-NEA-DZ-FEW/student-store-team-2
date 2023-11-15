import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ProductItem from "../ProductItem";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ProductItem />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
