import { Db } from '@/lib/Db';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // retreving email from req
    const { email } = await req.json();

    // awating database connection
    await Db();

    // Verifying if the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Creating unique token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const passwordResetExpiryAt = Date.now() + 10 * 60 * 1000;

    // Saving the token
    user.passwordResetToken = passwordResetToken;
    user.passwordResetDate = new Date(passwordResetExpiryAt);
    await user.save();

    // creating a unqiue url
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword/${passwordResetToken}`;

    // sending the unqiue url to verified email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Warrenty Vault" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>To reset your password, click the link below:</p> <p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    return NextResponse.json(
      { message: 'Password reset email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('reset-password Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
