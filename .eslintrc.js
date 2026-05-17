module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['import'],
  rules: {
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'no-console': ['warn', {allow: ['warn', 'error']}],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {allowExpressions: true, allowTypedFunctionExpressions: true},
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
