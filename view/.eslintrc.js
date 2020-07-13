module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser', // the typescript-parser for eslint, instead of tslint
        sourceType: 'module', // allow the use of imports statements
        ecmaVersion: 2020
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                mocha: true
            }
        }
    ]
};
