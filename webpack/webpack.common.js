const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    alias: {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [
          '/node_modules/',
          '/src/**/*/__tests__/',
          '/src/**/*.test.ts',
          '/src/**/*.test.tsx',
          '/src/**/*.mock.ts',
        ],
        use: [
          {
            loader: 'babel-loader?compact=false',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:woff(2)|eot|ttf|otf|svg)$/i,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
      title: 'Hot Module Replacement',
      // favicon: './assets/logo.png',
    }),
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
};
