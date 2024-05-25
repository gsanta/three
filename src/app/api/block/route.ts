import db from '@/bff/config/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const blockTemplates = await db.blockTemplate.findMany();

  return NextResponse.json({ items: blockTemplates }, { status: 200 });
}
