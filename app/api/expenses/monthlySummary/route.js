import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  const currentDate = new Date();
  const parsedYear = year ? parseInt(year, 10) : currentDate.getFullYear();
  const parsedMonth = month ? parseInt(month, 10) : currentDate.getMonth() + 1;

  if (isNaN(parsedYear) || isNaN(parsedMonth)) {
    return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
  }

  if (parsedMonth < 1 || parsedMonth > 12) {
    return NextResponse.json({ error: 'Month must be between 1 and 12' }, { status: 400 });
  }

  const startDate = new Date(Date.UTC(parsedYear, parsedMonth - 1, 1));
  const endDate = new Date(Date.UTC(parsedYear, parsedMonth, 0, 23, 59, 59, 999));

  try {
    const total = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: session.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalAmount = total._sum.amount || 0;

    return NextResponse.json({
      month: parsedMonth,
      year: parsedYear,
      totalAmount,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch monthly summary' }, { status: 500 });
  }
}
