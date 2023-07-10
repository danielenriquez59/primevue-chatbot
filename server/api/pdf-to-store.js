// import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { Document } from "langchain/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { UnstructuredDirectoryLoader } from "langchain/document_loaders/fs/unstructured"; // https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/unstructured
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { writeFile } from "fs/promises";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import path from "path";
import fs from "fs";

export default eventHandler(async () => {
  let response = { status_code: 0, message: "" };
  // load pdf
  const runtimeConfig = useRuntimeConfig();
  const files = fs.readdirSync("./storage/pdf");
  let texts = [];
  for (const file of files) {
    // Skip if not a PDF file
    if (path.extname(file) !== ".pdf") continue;

    // load pdf
    const loader = new PDFLoader(path.join("./storage/pdf", file));
    const data = await loader.load();
    // console.log("Documents in data: ", data.length);
    // console.log("Characters in your data: ", data[0].pageContent.length);

    // split docs
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 0,
    });
    const text = await splitter.splitDocuments(data); // returns document
    texts.push(text[0]);
  }

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

  // write raw text
  //   await writeFile(path.join("./storage/text", "alltexts.txt"), texts);

  try {
    await PineconeStore.fromDocuments(texts, embeddings, { pineconeIndex });
    console.log(`Saved embeddings to pinecone index ${pineconeIndex}`);
    response.message = "Successfully saved successfully to pinecone index";
    response.status_code = 200;
  } catch (e) {
    response.message = e;
    response.status_code = 500;
    console.log(e);
  }

  return files;
});
