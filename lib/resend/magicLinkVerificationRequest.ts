import { Resend } from 'resend';
import MagicLinkEmail from '@/lib/resend/templates/MagicLinkEmail'

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function magicLinkVerificationRequest(params) {
  const { to, from, url } = params
  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: from,
      to: to,
      subject: 'Login To Jottings',
      react: MagicLinkEmail({ url, host })
    });
    return { success: true, data }
  } catch (error) {
    throw new Error('Failed to send the verification Email.')
  }
}