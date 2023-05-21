"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbums = exports.getTopTracks = exports.getArtist = exports.searchTracks = void 0;
const axios_1 = __importDefault(require("axios"));
// deezer API base URL
const baseURL = process.env.BASEURL;
// search tracks
const searchTracks = async (query) => {
    try {
        const response = await axios_1.default.get(`${baseURL}/search?q=${query}`);
        console.log(response.data.data);
        const tracks = response.data.data.map((track) => ({
            id: track.id,
            title: track.title,
            artist: track.artist.name,
            duration: track.duration,
            album: track.album.title,
            cover: track.album.cover_medium,
            artistId: track.artist.id,
        }));
        return tracks;
    }
    catch (error) {
        console.error("Error searching tracks:", error.message);
        throw new Error("Internal server error");
    }
};
exports.searchTracks = searchTracks;
// get artist information
const getArtist = async (id) => {
    try {
        const response = await axios_1.default.get(`${baseURL}/artist/${id}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching artist information:", error.message);
        throw new Error("Internal server error");
    }
};
exports.getArtist = getArtist;
// get top tracks for an artist
const getTopTracks = async (id, limit = 5) => {
    try {
        const response = await axios_1.default.get(`${baseURL}/artist/${id}/top?limit=${limit}`);
        const topTracks = response.data.data.map((track) => ({
            id: track.id,
            title: track.title,
            duration: track.duration,
        }));
        return topTracks;
    }
    catch (error) {
        console.error("Error fetching top tracks:", error.message);
        throw new Error("Internal server error");
    }
};
exports.getTopTracks = getTopTracks;
// get albums for an artist
const getAlbums = async (id) => {
    try {
        const response = await axios_1.default.get(`${baseURL}/artist/${id}/albums`);
        const albums = response.data.data.map((album) => ({
            id: album.id,
            title: album.title,
            year: album.release_date.split("-")[0],
            cover: album.cover_medium,
        }));
        return albums;
    }
    catch (error) {
        console.error("Error fetching albums:", error.message);
        throw new Error("Internal server error");
    }
};
exports.getAlbums = getAlbums;
