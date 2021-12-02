import nodemailer from 'nodemailer';
let aws = require("@aws-sdk/client-ses");

process.env.AWS_ACCESS_KEY_ID = "AKIAXM6MEFFNQNBCM55W";
process.env.AWS_SECRET_ACCESS_KEY = "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";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
});

let transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export default transporter
