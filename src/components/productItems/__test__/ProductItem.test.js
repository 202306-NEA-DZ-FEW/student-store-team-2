import renderer from "react-test-renderer";

import ProductItem from "../ProductItem";

it("renders correctly", () => {
    const tree = renderer.create(<ProductItem />).toJSON();
    expect(tree).toMatchSnapshot();
});
