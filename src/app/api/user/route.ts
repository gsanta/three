import db from '@/bff/config/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { registerSchema } from '@/common/validations/RegisterSchema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = registerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ user: null, message: 'The email is already registered' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created.' }, { status: 201 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'User not created.', error: message }, { status: 400 });
  }
}
