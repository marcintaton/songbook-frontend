const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    clean: true,
  },
};
