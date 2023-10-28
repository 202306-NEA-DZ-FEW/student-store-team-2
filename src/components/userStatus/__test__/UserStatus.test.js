import renderer from "react-test-renderer";

import { UserProvider } from "@/components/userProvider/UserProvider";

import UserStatus from "../UserStatus";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <UserProvider>
                <UserStatus />
            </UserProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
