import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import UserStatus from "../UserStatus";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <UserProvider>
                    <UserStatus />
                </UserProvider>
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
