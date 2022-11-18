import { elasticClient } from "./elasticClient";

const createIndex = async (indexName: string): Promise<void> => {
  await elasticClient.indices.create({ index: indexName });
};

createIndex("recipes");
