module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['import'],
  rules: {
    'import/no-cycle': ['error', {ignoreExternal: true}],
    'import/no-default-export': 'error',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/features/*/screens',
            from: './src/features/*/repositories',
            message:
              'Screens must not import repositories directly. Use hooks instead.',
          },
        ],
      },
    ],
    // Disabled: TypeScript handles these; RN's Flow-typed index.js breaks import/namespace
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
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
