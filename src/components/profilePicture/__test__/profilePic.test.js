import renderer from "react-test-renderer";

import ProfilePic from "@/components/profilePicture/ProfilePic";
const user = { full_name: "", avatar_url: "" };
it("render correctly", () => {
    const tree = renderer.create(<ProfilePic user={user} />).toJSON();
    expect(tree).toMatchSnapshot();
});
