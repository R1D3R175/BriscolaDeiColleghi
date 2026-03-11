import { baseConfig } from '@briscola-dei-colleghi/eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...baseConfig,
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      '@typescript-eslint/no-require-imports': [
        'error',
        { allowAsImport: true },
      ],
    },
  },
]);
