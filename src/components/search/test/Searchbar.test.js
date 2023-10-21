import renderer from "react-test-renderer";

import { useRouter } from "next/navigation";
import Searchbar from "../Searchbar";

jest.mock("next/navigation");
const pushMock = jest.fn();

it("renders correctly", () => {
    const tree = renderer.create(<Searchbar />).toJSON();
    expect(tree).toMatchSnapshot();
});
