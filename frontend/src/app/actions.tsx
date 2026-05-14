'use server'
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ActionResponse = {
  success: boolean;
  error?: string;
};

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().optional(),
});

export async function sendEmail(formData: FormData): Promise<ActionResponse> {
  if (!process.env.RESEND_API_KEY) {
    console.error('CRITICAL: RESEND_API_KEY is missing.');
    return { success: false, error: 'Server configuration error.' };
  }
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    honeypot: formData.get('honeypot'),
  });

  if (!validatedFields.success) {
    return { 
      success: false, 
      error: validatedFields.error.issues[0].message 
    };
  }

  const { name, email, message, honeypot } = validatedFields.data;

  if (honeypot) {
    console.warn('Honeypot triggered - potential bot detected.');
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'earthen505@gmail.com',
      replyTo: email,
      subject: `You got a message from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Message from EarthenHub</h2>
          <p>You received a new inquiry from your portfolio website:</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          <p><strong>Message:</strong></p>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
          <footer style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
            This email was sent from the contact form on earthenhub.my.id
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: 'Email service failure.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending exception:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}