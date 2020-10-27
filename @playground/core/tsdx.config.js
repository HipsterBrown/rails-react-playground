const path = require('path');
const stimulus = require('rollup-plugin-stimulus');

const external = id => !id.startsWith('.') && !path.isAbsolute(id);

module.exports = {
  rollup(config, options) {
    config.output = {
      dir: 'dist',
      format: options.format,
      sourcemap: true,
    };
    config.external = id => {
      if (
        id.startsWith('regenerator-runtime') ||
        id.startsWith('stimulus-controllers')
      ) {
        return false;
      }
      return external(id);
    };
    config.plugins.unshift(stimulus());
    return config;
  },
};
