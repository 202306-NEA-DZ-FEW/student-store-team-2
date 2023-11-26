/* eslint-env node */
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
    moduleNameMapper: {
        "^next$": require.resolve("next"),
        "^next/navigation$": require.resolve("next/navigation"),
        "^next-intl$": require.resolve("next-intl"),
    },
    testEnvironment: "jsdom",
    rootDir: "src",
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest", // Include both .js and .jsx, as well as .ts and .tsx
    },
});
