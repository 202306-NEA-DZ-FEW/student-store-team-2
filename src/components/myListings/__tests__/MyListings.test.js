import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import MyListings from "@/components/myListings/MyDashboard";

import messages from "../../../../messages/en.json";

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
    const type = "stuff";
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <MyListings />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
