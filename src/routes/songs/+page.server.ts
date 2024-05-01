import { api } from "$lib/api";

export async function load() {
  try {
    const { data: songs } = await api.get("/songs");
    const { data: albums } = await api.get("/albums");

    return { songs, albums: albums.map(({ name }: any) => name) };
  } catch(err) {
    return {
      songs: [],
      albums: []
    };
  }
}
