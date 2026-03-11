import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import baseConfig from './base.js';

export default defineConfig(
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  ...baseConfig,
  {
    files: ['**/*.ts'],
    extends: [...nx.configs['flat/angular'], angular.configs.tsRecommended],
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
      ...nx.configs['flat/angular-template'],
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
  },
  {
    files: ['**/*.stories.ts', '.storybook/**/*.ts'],
    // eslint-disable-next-line import-x/no-named-as-default-member
    extends: [...storybook.configs['flat/recommended']],
    rules: {
      'storybook/no-uninstalled-addons': 'off',
    },
  },
);
