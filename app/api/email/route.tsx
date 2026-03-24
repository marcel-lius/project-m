import { sanitizeText, sendEmailViaMailjet, validateEmail } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST handler for email endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, description } = body;

    // Validate inputs exist
    if (!name || !email) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          message: 'Name and email are required',
        },
        { status: 400 }
      );
    }

    // Validate name
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        {
          error: 'Invalid name',
          message: 'Name must be a non-empty string',
        },
        { status: 400 }
      );
    }

    if (name.trim().length > 200) {
      return NextResponse.json(
        {
          error: 'Name too long',
          message: 'Name must be 200 characters or less',
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          error: 'Invalid email address',
          message: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    // Check description length
    if (description && description.trim().length > 0 && description.length > 5000) {
      return NextResponse.json(
        {
          error: 'Invalid description',
          message: 'Please provide a valid description',
        },
        { status: 400 }
      );
    }

    // Send email via Mailjet
    await sendEmailViaMailjet(sanitizeText(name.trim()), email.trim(), sanitizeText(description || ''));

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        data: {
          name,
          email,
          descriptionLength: description.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
// export async function OPTIONS(request: NextRequest) {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// }
