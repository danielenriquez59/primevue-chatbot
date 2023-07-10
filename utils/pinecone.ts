import { PineconeClient } from "@pinecone-database/pinecone";
const runtimeConfig = useRuntimeConfig();
export const pinecone = async () => {
    const client = new PineconeClient();
    await client.init({
        api_key: runtimeConfig.public.PINECONE_API_KEY, // find at app.pinecone.io
        environment: runtimeConfig.public.PINECONE_API_ENV, // next to api key in console
    });
    return client;
}