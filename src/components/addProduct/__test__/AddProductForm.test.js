import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import AddProductForm from "../AddProductForm";
import messages from "../../../../messages/en.json";

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

jest.mock("@supabase/supabase-js", () => {
    return {
        ...jest.requireActual("@supabase/supabase-js"), // Use the actual module for non-mocked parts
        createClient: jest.fn(() => ({
            from: jest.fn(() => ({
                select: jest.fn(() => ({
                    eq: jest.fn(() => ({
                        // Customize the behavior of your Supabase queries as needed
                        data: { id: 123, name: "John Doe" },
                        error: null,
                    })),
                })),
            })),
        })),
    };
});

const categories = [["Electronics", "Books", "Clothing"]];

it("renders correctly", async () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UserProvider>
                    <AddProductForm categories={categories} />{" "}
                </UserProvider>
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
