import renderer from "react-test-renderer";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import ProductDetailSection from "../ProductDetailSection";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ProductDetailSection />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
