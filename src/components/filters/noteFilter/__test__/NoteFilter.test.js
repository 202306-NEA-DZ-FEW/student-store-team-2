import { NextIntlClientProvider } from "next-intl";
import renderer from "react-test-renderer";

import messages from "@/../messages/en.json";

import NoteFilter from "../NoteFilter";
it("renders correctly", () => {
    const tree = renderer
        .create(
            <NextIntlClientProvider locale='en' messages={messages}>
                <NoteFilter />
            </NextIntlClientProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
