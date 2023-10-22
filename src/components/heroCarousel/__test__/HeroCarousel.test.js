import renderer from "react-test-renderer";
import HeroCarousel from "../HeroCarousel";

it("renders correctly", () => {
    const tree = renderer.create(<HeroCarousel />).toJSON();
    expect(tree).toMatchSnapshot();
});
