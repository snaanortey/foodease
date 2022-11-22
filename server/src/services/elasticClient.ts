import { Client } from "@elastic/elasticsearch";

// Typescript takes the environment variables as a string or undefined (in case they don't exist)
// Include an if statement to cater for what should happen if the environment variables don't exist

if (
  // process.env.ELASTIC_CLOUD_ID === undefined ||
  // process.env.ELASTIC_CLOUD_API_KEY === undefined
  process.env.ELASTIC_SEARCH_HOST_URL === undefined
) {
  throw console.error("environment variables are undefined");
}

export const elasticClient = new Client({
  node: process.env.ELASTIC_SEARCH_HOST_URL,
});
