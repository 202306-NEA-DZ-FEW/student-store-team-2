import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import HeroCarousel from "../HeroCarousel";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <HeroCarousel />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
