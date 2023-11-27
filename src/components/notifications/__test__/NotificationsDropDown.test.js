import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import NotificationsDropdown from "../NotificationsDropDown";
import messages from "../../../../messages/en.json";

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

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UserProvider>
                    <NotificationsDropdown />
                </UserProvider>
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
