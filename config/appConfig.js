const processEnv = process.env;
module.exports = {
  NODE_ENV: processEnv.NODE_ENV,
  PORT: processEnv.PORT,
  JWT_SECRET: processEnv.JWT_SECRET,
  DEV_DATABASE: processEnv.DEV_DATABASE,
  RANDOM: processEnv.RANDOM,
  JWT_EXPIRES_IN: processEnv.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: processEnv.JWT_COOKIE_EXPIRES_IN,
  USER_NAME: processEnv.USER_NAME,
  HOST_URL: processEnv.HOST_URL,
  ADMIN_HOST_URL: processEnv.ADMIN_HOST_URL,
  AWS_ACCESS_KEY: processEnv.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: processEnv.AWS_SECRET_KEY,
  AWS_SES_REGION: processEnv.AWS_SES_REGION,
  AWS_SES_SENDER: processEnv.AWS_SES_SENDER,
};
