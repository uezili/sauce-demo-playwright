module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:playwright/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['playwright'],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'playwright/no-conditional-in-test': 'error',
        'playwright/no-force-option': 'warn',
        'playwright/no-wait-for-timeout': 'warn',
        'playwright/no-skipped-test': 'warn'
    },
};