// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    rootDir: 'src',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        '.*\\.tsx?$': 'ts-jest'
    },
    testURL: 'http://localhost/',
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: 'coverage',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
};
