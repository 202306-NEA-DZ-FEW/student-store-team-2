import renderer from "react-test-renderer";

import HowItWorks from "../HowItWorks";

it("renders correctly", () => {
    const tree = renderer.create(<HowItWorks />).toJSON();
    expect(tree).toMatchSnapshot();
});
