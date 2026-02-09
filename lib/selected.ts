import api from "./axios";

export async function getSelected() {
  const response = await api.get("/getBooks", {
    params: { status: "selected" },
  });

  return response.data;
}
