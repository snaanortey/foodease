import { config } from "dotenv";
config();
import { app } from "./app";
import { AppDataSource } from "./dataSource";

const PORT: number = parseInt(process.env.PORT || "8000");

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

AppDataSource.initialize()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });
