import { authOptions } from '@/bff/config/auth';
import db from '@/bff/config/db';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type SnapshotRequest = {
  name: string;
  state: object;
  snapshotId?: string;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const user = await db.user.findUnique({ where: { email: session?.user?.email || '' } });

    const body = await req.json();
    const { name, state, snapshotId } = body as SnapshotRequest;

    await db.snapshot.upsert({
      where: {
        id: snapshotId || '',
      },
      update: {
        name: name,
        state: state,
      },
      create: {
        name: name,
        userId: user?.id,
        state: state,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    let message = 'Unkown error';

    if (error instanceof Prisma.PrismaClientValidationError) {
      message = 'Invalid data provided.';
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'Snapshot not created.', error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const user = await db.user.findUnique({ where: { email: session?.user?.email || '' } });

    const latestSnapshots = await db.snapshot.findMany({
      where: { userId: user?.id },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
    });
    return NextResponse.json({ items: latestSnapshots }, { status: 200 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'Could not get snapshot.', error: message }, { status: 400 });
  }
}
