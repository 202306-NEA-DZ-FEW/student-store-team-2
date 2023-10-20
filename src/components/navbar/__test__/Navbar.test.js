import renderer from "react-test-renderer";
import Navbar from "../Navbar";

// Mock the "next/navigation" module
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn(),
    })),
    usePathname: jest.fn(),
}));

it("renders correctly", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
});
