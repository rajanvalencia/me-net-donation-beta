// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { Email } from '@/app/components/Email';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email : z.string().email(),
  subject : z.string()

})

export  async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors)

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // なんすんだこれ
  const emailHtml = render(<Email url="https://example.com" />);

  const options = {
    from: body.email,
    to: 'koiralabishwas0816@gmail.com',
    subject: body.subject,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email', error });
  }
}
