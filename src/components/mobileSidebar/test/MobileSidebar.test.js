import renderer from "react-test-renderer";
import MobileSidebar from "../MobileSidebar";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");
const pushMock = jest.fn();

it("renders correctly", () => {
    // Create a mock function for the 'navigation' prop
    const navigationMock = [];

    const tree = renderer
        .create(<MobileSidebar navigation={navigationMock} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
