import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "express-async-errors";
import {config} from "dotenv";
import bodyParser from "body-parser";


config();

const app = express();
const PORT: number =  parseInt(process.env.PORT || "8000");

app.use(bodyParser.json());

app.use(cors());

app.use(fileUpload({createParentPath: true,}));

app.get("/", (req,res)=> {
    res.send("hello world");
})
app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})