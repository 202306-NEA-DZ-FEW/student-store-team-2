import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(<div>Navbar</div>).toJSON();
    expect(tree).toMatchSnapshot();
});
