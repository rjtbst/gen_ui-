// app/action.ts
'use server';

import { streamText } from 'ai';
import { llamaWithTools } from './lanchain/llamaWithTools';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1].content;

  const result = await llamaWithTools.invoke(lastMessage);

  return new Response(result.toString()); // or streamText if you return streams
}
