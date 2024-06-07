import db from '@/bff/config/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const blockTypes = await db.blockType.findMany();

  return NextResponse.json({ items: blockTypes }, { status: 200 });
}
