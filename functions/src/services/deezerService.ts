import axios from "axios";

// deezer API base URL
const baseURL = process.env.BASEURL;

// search tracks
export const searchTracks = async (query: string) => {
  try {
    const response = await axios.get(`${baseURL}/search?q=${query}`);
    console.log(response.data.data);
    const tracks = response.data.data.map((track: any) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      duration: track.duration,
      album: track.album.title,
      cover: track.album.cover_medium,
      artistId: track.artist.id,
    }));
    return tracks;
  } catch (error: any) {
    console.error("Error searching tracks:", error.message);
    throw new Error("Internal server error");
  }
};

// get artist information
export const getArtist = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/artist/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching artist information:", error.message);
    throw new Error("Internal server error");
  }
};

// get top tracks for an artist
export const getTopTracks = async (id: string, limit = 5) => {
  try {
    const response = await axios.get(
        `${baseURL}/artist/${id}/top?limit=${limit}`
    );
    const topTracks = response.data.data.map((track: any) => ({
      id: track.id,
      title: track.title,
      duration: track.duration,
    }));
    return topTracks;
  } catch (error: any) {
    console.error("Error fetching top tracks:", error.message);
    throw new Error("Internal server error");
  }
};

// get albums for an artist
export const getAlbums = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/artist/${id}/albums`);
    const albums = response.data.data.map((album: any) => ({
      id: album.id,
      title: album.title,
      year: album.release_date.split("-")[0],
      cover: album.cover_medium,
    }));
    return albums;
  } catch (error: any) {
    console.error("Error fetching albums:", error.message);
    throw new Error("Internal server error");
  }
};
