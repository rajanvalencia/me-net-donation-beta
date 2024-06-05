import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { Email } from "@/app/components/Email";
import { NextResponse } from "next/server";

type Props = {
  recipient: string;
  subject: string;
  message: string;
};

export async function sendSuccesEmail({ recipient, subject, message }: Props) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465, // メール送信用の固定ポート番号
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: "info@me-net.or.jp",
    to: "rajan.valencia@au.com",
    subject: `[${process.env.ENV}] ${subject}`,
    html: render(<Email message={message} />),
  };

  return await new Promise((resolve, reject) => {
    transporter.sendMail(options, function (err) {
      if (!err) {
        resolve("Email sent!");
      } else {
        reject(err);
      }
    });
  });
}

// TODO: sendErrorEmail
// error credit番号でたたいて それで確認する、
