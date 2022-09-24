const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', () => {
          console.log('Compile is done !');
          setTimeout(() => {
            process.exit(0);
          });
        });
      },
    },
  ],
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
