import { config } from "dotenv";
config();
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const option : DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname+`/entity/*.ts`], 
  migrations: [__dirname+`/migration/*.ts`], 
  logging: ["query", "error"],
  
}
export const AppDataSource = new DataSource(option);
