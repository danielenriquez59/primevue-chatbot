import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export default eventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new PineconeClient();
  await client.init({
    apiKey: runtimeConfig.public.PINECONE_API_KEY, // find at app.pinecone.io
    environment: runtimeConfig.public.PINECONE_API_ENV, // next to api key in console
  });
  const pineconeIndex = client.Index(runtimeConfig.public.PINECONE_INDEX);
  const pineconeStore = new PineconeStore({ pineconeIndex });
  try {
    await pineconeStore.deleteDocuments();
  } catch (e) {
    console.log(e);
  }
});
