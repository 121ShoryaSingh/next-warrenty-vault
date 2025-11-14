import { NextRequest, NextResponse } from 'next/server';

export async function Delete(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
}
