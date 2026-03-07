import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';

export default defineConfig(
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    extends: [
      angular.configs.tsRecommended,
    ],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
  },
);
