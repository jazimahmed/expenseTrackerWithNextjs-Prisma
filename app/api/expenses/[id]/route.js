import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // make sure this path is correct and prisma is set up
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // make sure you configured this correctly

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  console.log('111',session);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const {id} = await params;
  

  try {
    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!expense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json(expense);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch expense' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  //const id = params.id;
  const { id } = await params;
  const body = await req.json();
  const { amount, category, description } = body;

  if (!amount || !category || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const updated = await prisma.expense.updateMany({
      where: {
        id,
        userId: session.user.id,
      },
      data: body,
    });

    if (updated.count === 0) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    const updatedExpense = await prisma.expense.findUnique({ where: { id } });
    return NextResponse.json(updatedExpense);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const {id} = await params;

  try {
    const deleted = await prisma.expense.deleteMany({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}
