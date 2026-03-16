/** @import {Linter} from 'eslint'; */

/**
 *
 * @param {Linter.Config | Linter.Config[]} pluginFlatConfig
 * @param {string[]} pluginNames
 * @returns {Linter.Config[]}
 */
export const removePluginDefinitions = (pluginFlatConfig, pluginNames) => {
  pluginFlatConfig = Array.isArray(pluginFlatConfig)
    ? pluginFlatConfig
    : [pluginFlatConfig];

  for (const flatConfig of pluginFlatConfig) {
    if (!flatConfig.plugins) {
      continue;
    }

    for (const pluginName of pluginNames) {
      if (!flatConfig.plugins[pluginName]) {
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete flatConfig.plugins[pluginName];
    }
  }

  return pluginFlatConfig;
};
