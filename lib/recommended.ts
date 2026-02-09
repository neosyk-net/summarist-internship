import api from "./axios";

export async function getRecommended() {
  const response = await api.get("/getBooks", {
    params: { status: "recommended" },
  });

  return response.data;
}
