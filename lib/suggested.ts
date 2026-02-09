import api from "./axios";

export async function getSuggested() {
  const response = await api.get("/getBooks", {
    params: { status: "suggested" },
  });

  return response.data;
}
