import airbnbBase from 'eslint-config-airbnb-base';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'import/extensions': 'off',
      'no-undef': 'off',
    },
    plugins: {
      'import': eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];