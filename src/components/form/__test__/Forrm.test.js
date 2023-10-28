import renderer from "react-test-renderer";

import CustomForm from "../Form";

it("renders correctly", () => {
    const tree = renderer.create(<CustomForm />).toJSON();
    expect(tree).toMatchSnapshot();
});
