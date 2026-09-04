import { randomUUID } from 'node:crypto'
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
  const reference = `FB-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 8).toUpperCase()}`
  const submittedAt = new Date().toISOString()

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

  const contactEmail = emailOptIn && email ? email : 'Not provided'
  const message = [
    `Reference number: ${reference}`,
    `Feedback:\n${description}`,
    `Role: ${role || 'Not provided'}`,
    `Contact email: ${contactEmail}`,
    `Submitted at: ${submittedAt}`,
  ].join('\n\n')

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: emailOptIn && email ? email : undefined,
      subject: `[${reference}] New ASafariM DevTools feedback`,
      text: message,
    })

    if (emailOptIn && email) {
      await transporter.sendMail({
        from,
        to: email,
        subject: `[${reference}] Copy of your ASafariM feedback`,
        text: [
          `Thank you for contacting ASafariM. Here is a copy of your feedback.`,
          message,
          `If you would like to send a follow-up message, please contact contact@asafarim.com and mention your reference number: ${reference}.`,
        ].join('\n\n'),
      })
    }

    return NextResponse.json({ ok: true, reference })
  } catch {
    return NextResponse.json({ error: 'Unable to send feedback.' }, { status: 502 })
  } finally {
    transporter.close()
  }
}
