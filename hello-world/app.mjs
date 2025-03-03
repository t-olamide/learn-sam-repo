/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import os from 'os'
import axios from "axios";

export const lambdaHandler = async ({ name }, context) => {
  const smsCall = smsApiCall("2348144210035");
  console.log("🚀 ~ lambdaHandler ~ smsCall:", smsCall)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world from: Temi ' + os.hostname(),
      response: `Request getting this from request body ${name}`
    })
  };

  return response;
};

export const smsApiCall = async (phoneNumber, message = `Your Atmosphere OTP is: ${generateToken()}`) => {
  const payload = {
    "api_key": '',
    "to": phoneNumber,
    "from": "ATMOSPHERE",
    "sms": message,
    "type": "plain",
    "channel": "dnd"
  }
  const url = 'https://v3.api.termii.com/api/sms/send'

  const response = axios.post(url, payload)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

  return response;
}

export const generateToken = (length = 6) => {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

