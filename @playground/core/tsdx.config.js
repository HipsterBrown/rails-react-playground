module.exports = {
  rollup(config) {
    console.log(config.output);
    config.output = {
      dir: 'dist',
    };
    // config.output.dir = 'dist';
    return config;
  },
};
