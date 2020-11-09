const path = require('path');
const stimulus = require('rollup-plugin-stimulus');
const reactRoutes = require('@playground/rollup-plugin-react-routes');

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
        id.startsWith('stimulus-controllers') ||
        id.startsWith('react-routes')
      ) {
        return false;
      }
      return external(id);
    };
    config.plugins.unshift(reactRoutes());
    config.plugins.unshift(stimulus());
    return config;
  },
};
