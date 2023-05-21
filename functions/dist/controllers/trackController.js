"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTracksController = void 0;
const deezerService_1 = require("../services/deezerService");
// search the tracks
const searchTracksController = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query)
            throw new Error("Missing query parameter");
        const tracks = await (0, deezerService_1.searchTracks)(query);
        res.json(tracks);
    }
    catch (error) {
        console.error("error searching tracks:", error.message);
        res.status(500).json({ error: error.message });
    }
};
exports.searchTracksController = searchTracksController;
