import renderer from "react-test-renderer";
import ProfilePic from "@/components/profilePicture/ProfilePic";

it("render correctly", () => {
    const tree = renderer.create(<ProfilePic />).toJSON();
    expect(tree).toMatchSnapshot();
});
