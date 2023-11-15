import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import ProductCard from "../ProductCard";
import messages from "../../../../messages/en.json";

const product = {
    pid: 5,

    category: 1,
    condition: 8,
    created_at: "2023-09-05",
    description: "Classic literature set for book enthusiasts.",
    for_borrow: true,
    for_sale: false,
    index: 0,
    id: "product0",
    image: [
        "https://images.placeholders.dev/?width=100&height=100",
        "https://images.placeholders.dev/?width=100&height=100",
        "https://images.placeholders.dev/?width=100&height=100",
        "https://images.placeholders.dev/?width=100&height=100",
    ],
    is_borrowed: false,
    is_borrowed_period: 0,
    is_sold: false,
    name: "Classic literature set",
    price: 99.95,
    uid: "user123",
};

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <ProductCard
                    product={product}
                    categories={["book", "clothes"]}
                />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
