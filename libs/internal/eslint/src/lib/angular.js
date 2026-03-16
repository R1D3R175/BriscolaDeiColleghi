import nx from '@nx/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import {defineConfig} from 'eslint/config';
import baseConfig from './base.js';

export default defineConfig(
  baseConfig,
  nx.configs['flat/angular'],
  nx.configs['flat/angular-template'],
  {
    files: ['**/*.spec.ts'],
    extends: [vitest.configs.recommended, vitest.configs.env],
    rules: {
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
    },
  },
  {
    rules: {
      'new-cap': [
        'error',
        {
          capIsNewExceptions: ['Component'],
        },
      ],
    },
  },
);
