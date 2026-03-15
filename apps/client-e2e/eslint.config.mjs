import {defineConfig} from 'eslint/config';
import playwright from 'eslint-plugin-playwright';
import {baseConfig} from '@briscola-dei-colleghi/eslint';

export default defineConfig(baseConfig, playwright.configs['flat/recommended']);
