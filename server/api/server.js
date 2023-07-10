// import { PineconeStore } from "langchain/vectorstores";
// import { OpenAIEmbeddings } from "langchain/embeddings";
// import { VectorDBQAChain } from "langchain/chains";
// import { ChatOpenAI } from "langchain/chat_models";
// import { PineconeClient } from "@pinecone-database/pinecone";

// initialize the pinecone client
// const runtimeConfig = useRuntimeConfig();
// const client = new PineconeClient();
// await client.init({
//   apiKey: runtimeConfig.public.PINECONE_API_KEY,
//   environment: runtimeConfig.public.PINECONE_ENVIRONMENT,
// });
// const pineconeIndex = client.Index(runtimeConfig.public.PINECONE_INDEX);

// export const POST = async ({ request }) => {
//   const { text } = await request.json();
//   const embeddings = new OpenAIEmbeddings({
//     openAIApiKey: runtimeConfig.public.OPENAI_API_KEY,
//   });

//   const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
//     pineconeIndex,
//   });

//   const llm = new ChatOpenAI({
//     temperature: temperature,
//     openAIApiKey: runtimeConfig.public.OPENAI_APIKEY,
//     modelName: model,
//   });

//   const chain = VectorDBQAChain.fromLLM(llm, vectorStore, {
//     k: 5,
//     returnSourceDocuments: true,
//   });
//   const response = await chain.call({ query: text });
//   const { text: responseText, sourceDocuments } = response;
//   return json({
//     text: responseText,
//     source: sourceDocuments[0]?.pageContent ?? "No source document found",
//   });
// };
