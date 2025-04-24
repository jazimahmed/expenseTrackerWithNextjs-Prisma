import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'All fields required' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { username } });

  if (existing) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashed = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashed,
    },
  });
  const { password: _, ...userWithoutPassword } = newUser;

  return NextResponse.json({ message: 'User registered successfully!', user: userWithoutPassword }, { status: 201 });
}
