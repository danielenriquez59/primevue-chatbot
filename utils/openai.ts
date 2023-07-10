// openai.ts
import { Configuration, OpenAIApi } from "openai";
const runtimeConfig = useRuntimeConfig();

const configuration = new Configuration({
    apiKey: runtimeConfig.public.OPENAI_APIKEY,
});
const openai = new OpenAIApi(configuration);

const MODEL = "text-embedding-ada-002";

export async function createEmbedding(text: string) {
  const embedding = await openai.createEmbedding({
    model: MODEL,
    input: text,
  });

  return embedding.data;
}