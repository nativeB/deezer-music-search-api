import * as functions from "firebase-functions";
import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response} from "express";
import {searchTracksController} from "./controllers/trackController";
import {getArtistInfoController} from "./controllers/artistController";
// import cors from "cors";
// app.use(cors());
const app = express();


// search tracks
app.get("/search", searchTracksController);

// get artist information, top tracks, and albms
app.get("/artists/:id", getArtistInfoController);

// error handling middleware
app.use((req: Request, res: Response) => {
  res.status(500).json({error: "Internal server error"});
});

// start the server
exports.app = functions.https.onRequest(app);
