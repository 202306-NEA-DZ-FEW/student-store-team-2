import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import GoogleLoginButton from "../GoogleButton";
import messages from "../../../../messages/en.json";

jest.mock("next/navigation");

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
jest.mock("@supabase/ssr", () => {
    return {
        ...jest.requireActual("@supabase/ssr"), // Use the actual module for non-mocked parts
        createBrowserClient: jest.fn(() => ({
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

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <GoogleLoginButton />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
