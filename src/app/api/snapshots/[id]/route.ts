import db from '@/bff/config/db';
import { NextRequest, NextResponse } from 'next/server';

type SnapshotsPatchBody = {
  state: string;
};

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

    return NextResponse.json(
      { code: 'ERR_OPERATION_FAILED', message: 'Could not load snapshot.', error: message },
      { status: 400 },
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.snapshot.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    let message = 'unkown error';

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { code: 'ERR_OPERATION_FAILED', message: 'Failed to delete snapshot.', error: message },
      { status: 400 },
    );
  }
}

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

    return NextResponse.json(
      { code: 'ERR_OPERATION_FAILED', message: 'Failed to update snapshot.', error: message },
      { status: 400 },
    );
  }
}
