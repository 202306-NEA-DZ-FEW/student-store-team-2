import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(<div>Footer</div>).toJSON();
    expect(tree).toMatchSnapshot();
});
