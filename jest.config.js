module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  roots: ["<rootDir>/lib"],
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverageFrom: ["!lib/common/**", "!lib/**/*.d.ts"],
};
