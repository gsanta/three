import db from '@/bff/config/db';
import { NextRequest, NextResponse } from 'next/server';

type SnapshotsPatchBody = {
  state: string;
};

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const body = await request.json();

  const { state } = body as SnapshotsPatchBody;

  try {
    await db.snapshot.update({
      where: {
        id,
      },
      data: {
        state,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'Could not update snapshot.', error: message }, { status: 400 });
  }
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const latestSnapshots = await db.snapshot.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        state: true,
      },
    });

    return NextResponse.json(latestSnapshots, { status: 200 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message: 'Could not get snapshot.', error: message }, { status: 400 });
  }
}
