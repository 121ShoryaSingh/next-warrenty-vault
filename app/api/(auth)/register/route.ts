import { Db } from '@/lib/Db';
import User from '@/model/User';
import { registerSchema } from '@/types/register';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export default async function POST(req: NextRequest) {
  await Db();
  try {
    const body = await req.json();

    //Validating Data
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error },
        { status: 400 }
      );
    }
    const { email, name, password } = result.data;

    //Checking existing user
    const existing = await User.findOne({ email });
    if (existing)
      return NextResponse.json(
        {
          message: 'User is already register with this email',
        },
        { status: 400 }
      );
    // Hashing the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and saving user
    await User.create({
      email,
      password: hashedPassword,
      name,
    });
    // Success response
    return NextResponse.json(
      { message: 'User registered successfully!' },
      { status: 201 }
    );
  } catch (error) {
    // Error handling if something went wrong
    console.error('Error while registering user', error);
    return NextResponse.json(
      { message: 'Failed to register user' },
      { status: 500 }
    );
  }
}
