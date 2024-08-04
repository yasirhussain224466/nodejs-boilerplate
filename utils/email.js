const AWS = require("aws-sdk");
const appConfig = require("../config/appConfig");

const SES_config = {
  accessKeyId: appConfig?.AWS_ACCESS_KEY,
  secretAccessKey: appConfig?.AWS_SECRET_KEY,
  region: appConfig.AWS_SES_REGION,
};
const AWS_SES = new AWS.SES(SES_config);

const sendEmail = async ({ recipientEmail, subject, bodyHTML }) => {
  const params = {
    Source: appConfig.AWS_SES_SENDER,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: bodyHTML,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const data = await AWS_SES.sendEmail(params).promise();
    return data;
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
