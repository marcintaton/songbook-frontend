/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (envVars) => {
  const { env } = envVars;

  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};
