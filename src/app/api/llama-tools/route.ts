import { NextRequest, NextResponse } from 'next/server';
import { llamaWithTools } from '../../lanchain/llamaWithTools';

export async function POST(req: NextRequest) {
  const { location } = await req.json();
  const result = await llamaWithTools.invoke({ location });
  return NextResponse.json({ result });
}