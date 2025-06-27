import { authOptions } from '@/bff/config/auth';
import db from '@/bff/config/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id !== params.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  await db.user.delete({
    where: {
      id: params.id,
    },
  });

  return new Response('User deleted', { status: 200 });
}
