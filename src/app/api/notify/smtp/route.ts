import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, text } = body || {};
    if (!to || !subject) return new Response('Bad Request', { status: 400 });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'appasilo2025@gmail.com',
        pass: process.env.SMTP_PASS || ''
      }
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || 'appasilo2025@gmail.com',
      to,
      subject,
      text: text || ''
    });

    return Response.json({ success: true, id: info.messageId });
  } catch (e: any) {
    return Response.json({ success: false, error: e?.message || 'SMTP error' }, { status: 500 });
  }
}


