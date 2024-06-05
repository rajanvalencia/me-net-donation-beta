import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { Email } from '@/app/components/Email';
import {  NextResponse } from 'next/server';

type Props = {
  recipient: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // メール送信用の固定ポート番号
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendSuccesEmail({ recipient, subject, message }: Props) {  
  const options = {
    from: "koiralabishwas0816@gmail.com",
    to: recipient,
    subject: `[${process.env.ENV}] ${subject}`,
    html: render(<Email message={message}/>),
  };

  try {
    await transporter.sendMail(options);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email', error });
  }
}


// TODO: sendErrorEmail
// error credit番号でたたいて それで確認する、