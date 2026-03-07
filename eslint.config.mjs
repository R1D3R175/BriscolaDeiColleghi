import eslint from '@eslint/js';
import nx from '@nx/eslint-plugin';
import { defineConfig } from "eslint/config";
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const nxConfigs = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
];

const baseConfig = [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  prettierRecommended,
  unicorn.configs.all,
];

const typescriptConfig = [
  tseslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.typescript,
];

const importRules = {
  'import/no-cycle': 'error',
  'import/first': 'error',
  'import/exports-last': 'error',
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
      alphabetize: { order: 'asc' },
    },
  ],
};

export default defineConfig(
  ...nxConfigs,
  {
    files: ['**/*.ts', '**/*.js'],
    extends: baseConfig,
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:api',
              onlyDependOnLibsWithTags: ['scope:api', 'scope:shared'],
            },
            {
              sourceTag: 'scope:client',
              onlyDependOnLibsWithTags: ['scope:client', 'scope:shared'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:utility',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'type:utility'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:utility'],
            },
            {
              sourceTag: 'type:utility',
              onlyDependOnLibsWithTags: ['type:utility'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    extends: typescriptConfig,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: '**/{ts,js}config.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      ...importRules,
    }
  },
);