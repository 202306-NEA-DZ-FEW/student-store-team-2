import renderer from "react-test-renderer";
import ProfileUserInfo from "../ProfileUserInfo";

it("renders correctly", () => {
    const tree = renderer.create(<ProfileUserInfo />).toJSON();
    expect(tree).toMatchSnapshot();
});
