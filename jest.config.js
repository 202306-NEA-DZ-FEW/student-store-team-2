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
});
