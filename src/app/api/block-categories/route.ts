import db from '@/bff/config/db';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import { NextResponse } from 'next/server';

export async function GET() {
  const blockCategories = (await db.blockCategory.findMany()) as BlockCategoriesResponse['items'];

  return NextResponse.json<BlockCategoriesResponse>({ items: blockCategories }, { status: 200 });
}
