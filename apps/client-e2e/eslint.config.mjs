import { baseConfig } from '@briscola-dei-colleghi/eslint';
import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  ...baseConfig,
  playwright.configs['flat/recommended'],
]);
