import renderer from "react-test-renderer";

import { UserProvider } from "../UserProvider";

jest.mock("next/navigation");

it("renders correctly", () => {
    const tree = renderer.create(<UserProvider />).toJSON();
    expect(tree).toMatchSnapshot();
});
