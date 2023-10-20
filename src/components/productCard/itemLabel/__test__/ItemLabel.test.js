import renderer from "react-test-renderer";

import ItemLabel from "../ItemLabel";

it("renders correctly", () => {
    const tree = renderer.create(<ItemLabel />).toJSON();
    expect(tree).toMatchSnapshot();
});
