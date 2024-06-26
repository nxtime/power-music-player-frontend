import { api } from "$lib/api";

export async function load() {
  try {
    const { data } = await api.get("/albums");

    return { albums: data };
  } catch(err) {
    return {
      albums: []
    };
  }
}
