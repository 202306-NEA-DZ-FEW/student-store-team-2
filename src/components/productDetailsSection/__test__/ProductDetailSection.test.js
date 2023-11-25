import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ProductDetailSection from "../ProductDetailSection";
import messages from "../../../../messages/en.json";
const user = { phone_num: "0556214761" };
it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ProductDetailSection user={user} />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
