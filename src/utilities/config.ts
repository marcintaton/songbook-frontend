import defaultConfig from 'config/default.json';
import devConfig from 'config/dev.json';
import prodConfig from 'config/prod.json';
import testConfig from 'config/test.json';

function getConfig() {
  const env = process.env.NODE_ENV;
  let envConfig = {};
  if (env === 'test') envConfig = testConfig;
  else if (env === 'prod' || env === 'production') envConfig = prodConfig;
  else if (env === 'dev' || env === 'development') envConfig = devConfig;

  return { ...defaultConfig, ...envConfig };
}

const config = getConfig();

export default config;
