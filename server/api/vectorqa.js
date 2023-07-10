import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { VectorDBQAChain } from "langchain/chains";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";

export default eventHandler(async (req) => {
  const runtimeConfig = useRuntimeConfig();
  const client = new PineconeClient();
  await client.init({
    apiKey: runtimeConfig.public.PINECONE_API_KEY,
    environment: runtimeConfig.public.PINECONE_API_ENV,
  });

  const pineconeIndex = client.Index(runtimeConfig.public.PINECONE_INDEX);

  const body = await readBody(req);
  const { text, model, temperature } = body;

  if (!text) {
    setResponseStatus("Missing text", 400);
  }
  if (text.length > 200) {
    setResponseStatus("Text too long", 400);
  }

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: runtimeConfig.public.OPENAI_APIKEY,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  const chatModel = new ChatOpenAI({
    temperature: temperature,
    openAIApiKey: runtimeConfig.public.OPENAI_APIKEY,
    modelName: model,
  });

  const chain = VectorDBQAChain.fromLLM(chatModel, vectorStore, {
    k: 5,
    returnSourceDocuments: true,
  });

  // BUG: this is a hack until i figure out how to pass chat history
  const response = await chain.call({ query: text[text.length - 1].content });

  const { text: responseText, sourceDocuments } = response;
  return {
    answer: responseText,
    source: sourceDocuments[0]?.pageContent ?? "No source document found",
  };
});
