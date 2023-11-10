import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import DashboardDisplay from "../DashboardDisplay";
import messages from "../../../../messages/en.json";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <DashboardDisplay />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
