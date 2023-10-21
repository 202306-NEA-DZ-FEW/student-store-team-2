import renderer from "react-test-renderer";

import Testimonials from "../Testimonials";

it("renders correctly", () => {
    const tree = renderer.create(<Testimonials />).toJSON();
    expect(tree).toMatchSnapshot();
});
