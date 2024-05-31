import { authOptions } from '@/bff/config/auth';
import db from '@/bff/config/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type SnapshotRequest = {
  state: object;
  snapshotId?: string;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const user = await db.user.findUnique({ where: { email: session?.user?.email || '' } });

    const body = await req.json();
    const { state, snapshotId } = body as SnapshotRequest;

    await db.snapshot.upsert({
      where: {
        id: snapshotId || '',
      },
      update: {
        state: state,
      },
      create: {
        userId: user?.id,
        state: state,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'Snapshot not created.', error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const user = await db.user.findUnique({ where: { email: session?.user?.email || '' } });

    const latestSnapshot = await db.snapshot.findMany({
      where: { userId: user?.id },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 1,
    });
    return NextResponse.json({ state: latestSnapshot[0]?.state }, { status: 200 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'Could not get snapshot.', error: message }, { status: 400 });
  }
}
