import { api } from "$lib/api";

export async function load({ params }: { params: { slug: string } }) {
  try {
    console.log(params);
    const { data } = await api.get(`/albums/${params.slug}`);

    return data;
  } catch(err) {
    return {
      name: "",
      cover: "",
      songs: ""
    };
  }
}
