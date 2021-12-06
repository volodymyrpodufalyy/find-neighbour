import nodemailer from 'nodemailer';
let aws = require("@aws-sdk/client-ses");

process.env.AWS_ACCESS_KEY_ID = "AKIAVSCPWZ2HRGR2KRHI";
process.env.AWS_SECRET_ACCESS_KEY = "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";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
});

let transporter = nodemailer.createTransport({
  // SES: { ses, aws },
});

export default transporter
