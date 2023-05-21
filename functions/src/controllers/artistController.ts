import {Request, Response} from "express";
import {getArtist, getTopTracks, getAlbums} from "../services/deezerService";

// get artist information, top tracks, and albums
export const getArtistInfoController =
async (req: Request, res: Response): Promise<void> => {
  console.log(req.params);
  try {
    const {id} = req.params;
    const artist = await getArtist(id);
    console.log(artist);
    const topTracks = await getTopTracks(id);
    const albums = await getAlbums(id);

    const artistInfo = {
      id: artist.id,
      name: artist.name,
      fans: artist.nb_fan,
      cover: artist.picture_xl,
      topTracks,
      albums,
    };

    res.json(artistInfo);
  } catch (error: any) {
    console.error("Error fetching artist information:", error.message);
    res.status(500).json({error: "Internal server error"});
  }
};
