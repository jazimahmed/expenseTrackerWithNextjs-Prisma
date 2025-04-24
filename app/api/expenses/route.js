import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// POST: Create new expense
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { amount, category, description, date } = body;

    const newExpense = await prisma.expense.create({
      data: {
        amount,
        category,
        description,
        createdAt: date ? new Date(date) : new Date(),
        userId: session.user.id, // get userId from session
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to add expense' }, { status: 500 });
  }
}

// GET: Fetch user expenses

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const startDateRaw = searchParams.get('startDate');
  const endDateRaw = searchParams.get('endDate');
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  try {
    const where = {
      userId: session.user.id,
    };

    if (category) {
      where.category = category;
    }

    // Handle Dates
    const startDate = startDateRaw ? new Date(startDateRaw) : null;
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    if ((startDate && !isNaN(startDate)) || (endDate && !isNaN(endDate))) {
      const dateFilter = {};

      if (startDate && !isNaN(startDate)) {
        dateFilter.gte = startDate;
      }

      if (endDate && !isNaN(endDate)) {
        endDate.setHours(23, 59, 59, 999);
        dateFilter.lte = endDate;
      }

      where.createdAt = dateFilter;
    }

    const expenses = await prisma.expense.findMany({
      where,
      orderBy: sortBy ? { [sortBy]: order } : { createdAt: 'desc' },
    });

    if (expenses.length === 0) {
      return NextResponse.json({ error: 'No expenses found!' });
    }

    return NextResponse.json(expenses);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}
