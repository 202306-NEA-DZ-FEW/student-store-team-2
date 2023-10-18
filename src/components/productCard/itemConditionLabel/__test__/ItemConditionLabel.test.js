import renderer from "react-test-renderer";

import ItemConditionLabel from "../ItemConditionLabel";

it("renders correctly", () => {
    const tree = renderer.create(<ItemConditionLabel />).toJSON();
    expect(tree).toMatchSnapshot();
});
