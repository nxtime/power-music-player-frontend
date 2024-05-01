import { api } from "$lib/api";

export async function load() {
  try {
    const { data } = await api.get("/songs");

    return { songs: data };
  } catch(err) {
    return {
      songs: []
    };
  }
}
