import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

interface FeedbackPayload {
  description?: unknown
  role?: unknown
  emailOptIn?: unknown
  email?: unknown
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const body = (await request.json()) as FeedbackPayload
  const description = text(body.description)
  const role = text(body.role)
  const email = text(body.email)
  const emailOptIn = body.emailOptIn === true
  const user = text(process.env.SMTP_USER)
  const password = process.env.SMTP_PASSWORD
  const from = text(process.env.SMTP_FROM) || user
  const recipient = text(process.env.SMTP_BCC) || from

  if (!description || description.length > 5000) {
    return NextResponse.json({ error: 'Invalid feedback.' }, { status: 400 })
  }
  if (emailOptIn && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (!user || !password || !from || !recipient) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    requireTLS: process.env.SMTP_REQUIRE_TLS === 'true',
    auth: { user, pass: password },
    logger: process.env.SMTP_LOGGING === 'true',
    debug: process.env.SMTP_DEBUG === 'true',
  })

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: emailOptIn && email ? email : undefined,
      subject: 'New ASafariM DevTools feedback',
      text: [
        `Feedback:\n${description}`,
        `Role: ${role || 'Not provided'}`,
        `Contact email: ${emailOptIn && email ? email : 'Not provided'}`,
        `Submitted at: ${new Date().toISOString()}`,
      ].join('\n\n'),
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to send feedback.' }, { status: 502 })
  } finally {
    transporter.close()
  }
}
