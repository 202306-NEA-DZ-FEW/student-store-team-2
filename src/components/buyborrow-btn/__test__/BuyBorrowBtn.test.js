import renderer from "react-test-renderer";
import BuyBorrowBtn from "../BuyBorrowBtn";

it("renders correctly", () => {
    const tree = renderer.create(<BuyBorrowBtn />).toJSON();
    expect(tree).toMatchSnapshot();
});
