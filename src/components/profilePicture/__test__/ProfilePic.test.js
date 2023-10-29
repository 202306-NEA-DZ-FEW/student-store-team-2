import renderer from "react-test-renderer";
import ProfilePic from "../ProfilePic";

it("renders correctly", () => {
    const tree = renderer.create(<ProfilePic />).toJSON();
    expect(tree).toMatchSnapshot();
});
