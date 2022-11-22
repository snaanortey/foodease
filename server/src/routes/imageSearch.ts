import express from "express";
// Imports the Google Cloud client library
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { RequestHandler } from "express-serve-static-core";
import fileUpload from "express-fileupload";

//Creates a client from the Google client library
const client = new ImageAnnotatorClient();
const router = express.Router();

const routeHandler: RequestHandler = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
      return;
    }

    const { image } = req.files;
    const { data } = image as fileUpload.UploadedFile;

    // The image buffer is stored in the data property of the image
    // Call the google API passing to it the image buffer (image.data)
    const [result] = await client.objectLocalization!(data);
    const annotations = result.localizedObjectAnnotations;

    if (annotations === null || annotations === undefined) {
      res.send([]);
      console.log("Objects on image could not be read");
      return;
    }

    const annotationsWithNameProperty = annotations.filter((item) => {
      if (item.name) {
        return true;
      }
      return false;
    });
    const namesArray = annotationsWithNameProperty.map((item) => item.name!);
    // const response = await searchIngredientsByKeyWords(namesArray);
    res.send(namesArray);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

router.post("/", routeHandler);

export default router;
