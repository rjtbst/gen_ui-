import { Ollama } from '@langchain/ollama';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { RunnableSequence } from '@langchain/core/runnables';

const weatherTool = new DynamicStructuredTool({
  name: 'get_current_weather',
  description: 'Returns mocked weather data',
  schema: z.object({
    location: z.string(),
  }),
  func: async ({ location }) => {
    return `Weather in ${location} is... sunny 🌞 (mocked)`;
  },
});

const llm = new Ollama({
  model: 'llama3',
});

// Example: Compose a sequence that first calls the tool, then the LLM
export const llamaWithTools = RunnableSequence.from([
  weatherTool,
  llm,
]);