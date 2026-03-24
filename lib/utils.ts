import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitizeHtml from 'sanitize-html';
import Mailjet from 'node-mailjet';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitizes text using sanitize-html library
 */
export function sanitizeText(text: string): string {
  const sanitized = sanitizeHtml(text, {
    allowedTags: ['b', 'i', 'em', 'strong', 'br', 'p', 'ul', 'ol', 'li'],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  });
  
  // Trim whitespace and limit length
  return sanitized.trim();
}

/**
 * Sends email using Mailjet
 */
export async function sendEmailViaMailjet(
  name: string,
  email: string,
  description: string
): Promise<void> {
  // Initialize Mailjet client
  const mj = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_SECRET_KEY || ''
  });

  mj.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_FROM_EMAIL || 'white.cappucino@gmail.com',
          Name: process.env.MAILJET_FROM_NAME || 'Website Contact Form',
        },
        To: [
          {
            Email: process.env.MAILJET_TO_EMAIL || 'marcellius@rocketmail.com',
            Name: 'Marcellius',
          },
        ],
        Subject: `${name} is interested in you`,
        TextPart: `Name: ${name}\nEmail: ${email}\nMessage: ${description}`,
        HTMLPart: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${description.replace(/\n/g, '<br>')}</p>
        `,
      },
    ],
  });
}
