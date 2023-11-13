import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import messages from "@/../messages/en.json";

import ProductsFilterWrapper from "../ProductsFilterWrapper";

// Mock the "next/navigation" module
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
                <ProductsFilterWrapper />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
