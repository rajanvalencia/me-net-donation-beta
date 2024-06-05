import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { Email } from "@/app/components/Email";
import { NextResponse } from "next/server";

type Props = {
  recipient: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465, // メール送信用の固定ポート番号
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendSuccesEmail({ recipient, subject, message }: Props) {
  const options = {
    from: "info@me-net.or.jp",
    to: recipient,
    subject: `[${process.env.ENV}] ${subject}`,
    html: render(<Email message={message} />),
  };

  try {
    await transporter.sendMail(options);
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    return NextResponse.json({
      status: 500,
      message: "Email error",
    });
  }
}

// TODO: sendErrorEmail
// error credit番号でたたいて それで確認する
