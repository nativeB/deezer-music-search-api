"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistInfoController = void 0;
const deezerService_1 = require("../services/deezerService");
// get artist information, top tracks, and albums
const getArtistInfoController = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;
        const artist = await (0, deezerService_1.getArtist)(id);
        console.log(artist);
        const topTracks = await (0, deezerService_1.getTopTracks)(id);
        const albums = await (0, deezerService_1.getAlbums)(id);
        const artistInfo = {
            id: artist.id,
            name: artist.name,
            fans: artist.nb_fan,
            cover: artist.picture_xl,
            topTracks,
            albums,
        };
        res.json(artistInfo);
    }
    catch (error) {
        console.error("Error fetching artist information:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getArtistInfoController = getArtistInfoController;
