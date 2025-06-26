import { authOptions } from '@/bff/config/auth';
import db from '@/bff/config/db';
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

    const user = await db.user.findUniqueOrThrow({ where: { email: session?.user?.email || '' } });

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
        userId: user.id,
        state: state,
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { code: 'ERR_OPERATION_FAILED', message: 'Failed to create snapshot.', error },
      { status: 400 },
    );
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
    return NextResponse.json(
      { code: 'ERR_OPERATION_FAILED', message: 'Failed to load snapshots.', error },
      { status: 400 },
    );
  }
}
