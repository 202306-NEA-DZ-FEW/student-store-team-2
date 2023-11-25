import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ProductDetailSection from "../ProductDetailSection";
import messages from "../../../../messages/en.json";
const user = { phone_num: "0556214761" };
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn(),
    })),
    usePathname: jest.fn(),
    useParams: () => ({
        locale: "en",
    }),
}));
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
