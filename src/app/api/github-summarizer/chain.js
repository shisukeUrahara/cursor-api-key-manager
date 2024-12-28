import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

export async function summarizeReadme(readmeContent) {
  const responseSchema = z.object({
    summary: z.string().describe("A concise summary of the GitHub repository"),
    cool_facts: z.array(z.string()).describe("A list of 2 interesting facts about the repository"),
  });

  const model = new ChatOpenAI({ temperature: 0 , openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY , modelName: "gpt-3.5-turbo"}).withStructuredOutput(responseSchema);

  const prompt = ChatPromptTemplate.fromTemplate(`
  Summarize this github repository from this readme file content:

  {readmeContent}

  Provide your response with a summary and 2 cool facts about the repository.
  `);

  const chain = RunnableSequence.from([prompt, model]);

  const result = await chain.invoke({ readmeContent });
  return result;
}