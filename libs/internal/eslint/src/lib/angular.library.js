import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import baseConfig from './base.js';

export const withoutStorybookConfig = defineConfig(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    extends: [...nx.configs['flat/angular'], angular.configs.tsRecommended],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
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
);

export const withStorybookConfig = defineConfig(
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  ...withoutStorybookConfig,
  {
    files: ['**/*.stories.ts', '.storybook/**/*.ts'],
    // eslint-disable-next-line import-x/no-named-as-default-member
    extends: [...storybook.configs['flat/recommended']],
    rules: {
      'storybook/default-exports': 'error',
      'storybook/story-exports': 'error',
      'storybook/no-stories-of': 'error',
      'storybook/no-title-property-in-meta': 'error',
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
    },
  },
);
