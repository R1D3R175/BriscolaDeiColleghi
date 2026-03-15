import path from 'node:path';
import {fileURLToPath} from 'node:url';
import type {StorybookConfig} from '@storybook/angular';

const getAbsolutePath = (value: string) =>
  path.dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));

const config: StorybookConfig = {
  stories: ['../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },
};

export default config;
