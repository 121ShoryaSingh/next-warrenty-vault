import { Db } from '@/lib/Db';
import User from '@/model/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const { resetToken, newPassword } = await req.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json(
        {
          message: 'resetToken or newPassword is missing',
        },
        { status: 400 }
      );
    }

    await Db();

    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetDate: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'Reset Token is invalid or expired token',
        },
        { status: 400 }
      );
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password!);

    if (isSamePassword) {
      return NextResponse.json(
        { message: 'New password should be different from current password' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetDate = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reseting password', error);
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
