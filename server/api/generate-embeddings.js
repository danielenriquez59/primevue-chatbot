import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import path from "path";
import { readFile } from "fs/promises";

export default eventHandler(async () => {
  let response = { status_code: 0, message: "" };
  const runtimeConfig = useRuntimeConfig();
  const texts = await readFile(path.join("./storage/text", "alltexts.txt"), {
    encoding: "utf-8",
  });
  console.log(`Got ${texts.length} embeddings ready to save`);
  console.log(texts);

  // initialize the pinecone client
  const client = new PineconeClient();
  await client.init({
    apiKey: runtimeConfig.public.PINECONE_API_KEY, // find at app.pinecone.io
    environment: runtimeConfig.public.PINECONE_API_ENV, // next to api key in console
  });
  const pineconeIndex = client.Index(runtimeConfig.public.PINECONE_INDEX);
  const embeddings = new OpenAIEmbeddings({
    maxConcurrency: 5,
    openAIApiKey: runtimeConfig.public.OPENAI_APIKEY,
  }); // create embeddings

  try {
    await PineconeStore.fromTexts(texts, [], embeddings, { pineconeIndex });
    console.log(`Saved embeddings to pinecone index ${pineconeIndex}`);
    response.message = "Successfully saved successfully to pinecone index";
    response.status_code = 200;
  } catch (e) {
    response.message = e;
    response.status_code = 500;
    response.log(e);
  }

  return response;
});
