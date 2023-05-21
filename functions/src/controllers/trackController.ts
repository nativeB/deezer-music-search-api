import {Request, Response} from "express";
import {searchTracks} from "../services/deezerService";

// search the tracks
export const searchTracksController =
async (req: Request, res: Response): Promise<void> => {
  try {
    const {query} = req.query;
    if (!query) throw new Error("Missing query parameter");
    const tracks = await searchTracks(query as string);
    res.json(tracks);
  } catch (error: any) {
    console.error("error searching tracks:", error.message);
    res.status(500).json({error: error.message});
  }
};
