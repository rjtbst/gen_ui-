import { NextRequest } from "next/server";
import { Ollama } from "@langchain/ollama";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("No URL provided", { status: 400 });
  }

  // 1. Scrape text using langchain loader
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();
  const scrapedText = docs.map(d => d.pageContent).join("\n");

  // 2. Use LangChain Ollama and stream the result
  const ollama = new Ollama({
    model: "llama3",
  });

  const chain = RunnableSequence.from([
    (input: string) => `Summarize the following content:\n\n${input}`,
    ollama,
    new StringOutputParser(),
  ]);

  const stream = await chain.stream(scrapedText);

  // Manual streaming response
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}